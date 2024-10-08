package handler

import (
    "context"
    "encoding/json"
    "log"
    "net/http"
    "os"
    "strings"

    "github.com/go-redis/redis/v8"
)

var redisClient *redis.Client

type LeaderboardEntry struct {
    Username string `json:"username"`
    Points   int    `json:"points"`
}

func init() {
    serviceURI := os.Getenv("REDIS_URI")
    
    opts, err := redis.ParseURL(serviceURI)
    if err != nil {
        log.Fatalf("Failed to parse Redis URL: %v", err)
    }

    redisClient = redis.NewClient(opts)
    
    // Ping the Redis server to check the connection
    ctx := context.Background()
    _, err = redisClient.Ping(ctx).Result()
    if err != nil {
        log.Fatalf("Could not connect to Redis: %v", err)
    }
}

func Handler(w http.ResponseWriter, r *http.Request) {
    // Set CORS headers
    w.Header().Set("Access-Control-Allow-Origin", "*")
    w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
    w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

    if r.Method == "OPTIONS" {
        w.WriteHeader(http.StatusOK)
        return
    }

    path := strings.TrimPrefix(r.URL.Path, "/api/")
    
    switch path {
    case "leaderboard":
        getLeaderboard(w, r)
    case "score":
        updateScore(w, r)
    case "save":
        saveGame(w, r)
    case "load":
        loadGame(w, r)
    case "health":
        healthCheck(w, r)
    default:
        http.Error(w, "Not found", http.StatusNotFound)
    }
}

func healthCheck(w http.ResponseWriter, r *http.Request) {
    w.WriteHeader(http.StatusOK)
    w.Write([]byte("Backend is running"))
}

func getLeaderboard(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	scores, err := redisClient.ZRevRangeWithScores(ctx, "leaderboard", 0, 9).Result()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	var leaderboard []LeaderboardEntry
	for _, z := range scores {
		username := z.Member.(string)
		points := int(z.Score)
		leaderboard = append(leaderboard, LeaderboardEntry{Username: username, Points: points})
	}

	json.NewEncoder(w).Encode(leaderboard)
}

func updateScore(w http.ResponseWriter, r *http.Request) {
	var entry LeaderboardEntry
	if err := json.NewDecoder(r.Body).Decode(&entry); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	ctx := r.Context()
	_, err := redisClient.ZIncrBy(ctx, "leaderboard", float64(entry.Points), entry.Username).Result()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}

func saveGame(w http.ResponseWriter, r *http.Request) {
	var gameState map[string]interface{}
	if err := json.NewDecoder(r.Body).Decode(&gameState); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	username := gameState["username"].(string)
	ctx := r.Context()
	jsonState, _ := json.Marshal(gameState)
	err := redisClient.Set(ctx, "game:"+username, jsonState, 0).Err()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}

func loadGame(w http.ResponseWriter, r *http.Request) {
	username := r.URL.Query().Get("username")
	if username == "" {
		http.Error(w, "Username is required", http.StatusBadRequest)
		return
	}

	ctx := r.Context()
	jsonState, err := redisClient.Get(ctx, "game:"+username).Result()
	if err == redis.Nil {
		http.Error(w, "No saved game found", http.StatusNotFound)
		return
	} else if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(jsonState))
}