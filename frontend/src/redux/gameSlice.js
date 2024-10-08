import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { saveGame, loadGame, updateScore } from '../api';

export const loadSavedGame = createAsyncThunk(
  'game/loadSavedGame',
  async (username, { rejectWithValue }) => {
    try {
      const savedGame = await loadGame(username);
      return savedGame;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  deck: [],
  isGameStarted: false,
  isGameOver: false,
  message: '',
  hasDefuseCard: false,
  points: 0,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    startGame: (state) => {
      state.deck = shuffleDeck();
      state.isGameStarted = true;
      state.isGameOver = false;
      state.message = '';
      state.hasDefuseCard = false;
      state.points = 0;
    },
    drawCard: (state, action) => {
      if (state.deck.length === 0) {
        state.isGameOver = true;
        state.message = 'You win!';
        state.points += 1;
        updateScore(action.payload, state.points);
        return;
      }

      const card = state.deck.pop();
      switch (card) {
        case 'cat':
          state.message = 'You drew a cat card!';
          break;
        case 'defuse':
          state.hasDefuseCard = true;
          state.message = 'You drew a defuse card!';
          break;
        case 'shuffle':
          state.deck = shuffleDeck();
          state.message = 'Shuffle card drawn! Deck reshuffled.';
          break;
        case 'explode':
          if (state.hasDefuseCard) {
            state.hasDefuseCard = false;
            state.message = 'Bomb defused!';
          } else {
            state.isGameOver = true;
            state.message = 'Game over! You drew an exploding kitten!';
            updateScore(action.payload, state.points);
          }
          break;
        default: break;
      }
      saveGame({ ...state, username: action.payload });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadSavedGame.fulfilled, (state, action) => {
      if (action.payload) {
        return { ...action.payload, isGameStarted: true };
      }
    });
  },
});

function shuffleDeck() {
  const cards = ['cat', 'defuse', 'shuffle', 'explode', 'cat'];
  return cards.sort(() => Math.random() - 0.5);
}

export const { startGame, drawCard } = gameSlice.actions;
export default gameSlice.reducer;