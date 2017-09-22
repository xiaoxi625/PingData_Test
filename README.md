Source code is answer.js and input file is input.csv
My nodejs version is 6.9, after install nodejs, go to the folder which contain both answer.js file and input.csv
Run: node answer.js
!!The input file name and path defined in answer.js, so the test input.csv must be named input.csv and the path should be same with answer.js

Code structure:
  1. Read file from csv file and load in memory.
  2. Create two dimensional array for csv file, and map all cells into this two dimensional array
  3. Added four function to judge each item is number, operator, char or space.
  4. Added opcode function for 4 operator calculation.
  5. Do for loop with two dimensional array to find each cell value and do one more loop for cell value to put cell value(such as b1, b2, +) into stack.
  6. If the value in cell is operator(such as + - * /), pop up value from stack and calculator then put new value back to stack.
  7. If the item in cell is not number, then put it in a map to keep cells value which cannot be calculate in current loop.
  8. In next loop, find any cell has result in map and replace cell variable to certain number.
  9. Keep loop and replace arr value unless all cells do not has a-z char.
  10. Then stop loop and write the result to output.csv file.

Limitation:
  1. all cell var must can be calculate, two cells value could not refer each other.
  Such as input.csv looks like "b1, a1". Because b1 relies on a1 value and a1 relies on b1 value.
  Neither b1 or a1 can be calculated.
  2. input file could not be too large. input file loads to memory directly so if the csv file too large, it may have memory leak issue
  3. columns should be a to z, not include A-Z because the RegExp doesn't fully cover capital letter A-Z in each cell

