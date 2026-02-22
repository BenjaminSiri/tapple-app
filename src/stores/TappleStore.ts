import { makeAutoObservable } from 'mobx';
import type { Letter } from '../types/tappleTypes';

const TIME_LIMIT = 10; // seconds

class TappleStore {
  letters: Letter[] = [
    { char: 'A', status: true },
    { char: 'B', status: true },
    { char: 'C', status: true },
    { char: 'D', status: true },
    { char: 'E', status: true },
    { char: 'F', status: true },
    { char: 'G', status: true },
    { char: 'H', status: true },
    { char: 'I', status: true },
    { char: 'J', status: true },
    { char: 'K', status: true },
    { char: 'L', status: true },
    { char: 'M', status: true },
    { char: 'N', status: true },
    { char: 'O', status: true },
    { char: 'P', status: true },
    { char: 'R', status: true },
    { char: 'S', status: true },
    { char: 'T', status: true },
    { char: 'W', status: true },
  ]

  private easyCategories: string[] = [
    "Foods",
    "Colors",
    "Animals",
    "Fruits",
    "Vegetables",
    "Sports",
    "Clothing items",
    "Breakfast foods",
    "Types of drinks",
    "Ice cream flavors",
    "Pizza toppings",
    "Parts of the body",
    "Things in a kitchen",
    "Things at the beach",
    "Furniture",
    "Flowers",
    "Types of birds",
    "Insects",
    "Desserts",
    "Board games",
]

private hardCategories: string[] = [
    "Players Choice",
    "Countries",
    "Car brands",
    "Musical instruments",
    "Jobs or professions",
    "Tools",
    "Types of trees",
    "Things in the sky",
    "Things you plug in",
    "Things that are cold",
    "Things that are hot",
    "US cities",
    "Candy or chocolate brands",
    "TV shows",
    "Hobbies",
    "Things in a park",
    "Types of fish",
    "Things made of metal",
    "Things made of wood",
    "Video games",
    "Superheroes",
    "Types of dance",
    "Things in space",
    "Seasons or holidays",
    "Things that fly",
    "School subjects",
    "Things with wheels",
    "Weather conditions",
    "Movies",
]

  currentCategory: string | null = null;

  private timerId: number | null = null;
  timeLeft: number = TIME_LIMIT;
  timeOver: boolean = false;
  timeWarning: boolean = false;

  currentCategoryOptions: { text: string; difficulty: 'easy' | 'hard' }[] = [];

  constructor() {
    makeAutoObservable(this);
    this.currentCategory = 'Choose a category';
  }

  setLetterStatus(char: string, status: boolean) {
    const letter = this.letters.find(letter => letter.char === char);
    if (letter) {
      letter.status = status;
    }
  }

  disableLetter(char: string) {
    if (this.getLetterStatus(char) === false) {
      return; // Letter already disabled
    }
    this.setLetterStatus(char, false);
    this.startTimer();
  }

  resetGame() {
    this.letters.forEach(letter => {
      letter.status = true;
    });
    this.clearTimer();
  }

  getLetterStatus(char: string): boolean {
    const letter = this.letters.find(letter => letter.char === char);
    return letter ? letter.status : false;
  }

  randomizeCategory() {
    const easy = this.easyCategories[Math.floor(Math.random() * this.easyCategories.length)];
    const hard = this.hardCategories[Math.floor(Math.random() * this.hardCategories.length)];
    this.currentCategoryOptions = [
        { text: easy, difficulty: 'easy' },
        { text: hard, difficulty: 'hard' },
    ];
}

  setCategory(category: string) {
      this.currentCategory = category;
  }

  startTimer(): void {
    this.clearTimer();
    
    this.timerId = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft -= 1;
        if (this.timeLeft < 3) {
          this.timeWarning = true;
        }
      } else {
        this.stopTimer();
        this.timeOver = true;
      }
    }, 1000);
  }

  stopTimer(): void {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  clearTimer(): void {
    this.stopTimer(); // Clear any running timer
    this.timeLeft = TIME_LIMIT;
    this.timeOver = false;
    this.timeWarning = false;
  }

}

export default new TappleStore();