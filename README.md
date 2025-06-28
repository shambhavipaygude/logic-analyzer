<a id="readme-top"></a>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#features">Features</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#usage">Usage</a></li>
  </ol>
</details>

---

## About The Project

**Logic Analyzer** allows users to input any code snippet and instantly receive a **simple explanation** of what the code is doing. For those who might not have code on hand, it also includes a **"Load Sample"** feature where the AI itself generates a beginner-friendly code sample to analyze. Not just this but it also suggests an **optimized version** of the code, and **compares the time complexity of both versions** to help users understand not just what the code does, but how efficiently it does it.

---

### Features 

- Translates complex code logic into clear, **beginner-friendly explanations**.  
- Offers a one-click AI-generated **sample code feature** for learning or testing.
- Provides AI-driven **optimization suggestions** for better performance. 
- Compares the original vs optimized **time complexities** side-by-side.  
- Built with a clean, **interactive UI** using modern web technologies.

---

### Built With 

- [React JS](https://react.dev/)
- [Gemini API](https://ai.google.dev/)

---


## Installation
1. Clone the repo
   ```sh
   git clone https://github.com/shambhavipaygude/logic-analyzer
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Make `.env` file and add your API credentials in it.
   ```js
   API_KEY = 'ENTER YOUR API KEY';
   ```
4. Change git remote url to avoid accidental pushes to base project
   ```sh
   git remote set-url origin https://github.com/shambhavipaygude/logic-analyzer
   git remote -v 
   ```


## Usage
1. Visit Logic Analyzer and provide a code snippet in the ‘Code Input’ section.

  ![Step 1](<public/Picture1.png>) 
  
2. If you don’t have a code snippet handy, click on ‘Load Sample’ to get a sample code which will automatically be visible in input tab.
   
  ![Step 2](<public/Picture2.png>) 

3. Click on ‘Analyze Code’. You can hover over the ‘Code explanation’ or ‘Code optimization’ tabs to view the results once status check changes to ‘Analysis Complete’.

  ![Step 3](<public/Picture3.png>)  

  ![Step 4](<public/Picture4.png>)  



