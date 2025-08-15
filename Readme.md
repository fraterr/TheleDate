<img width="2880" height="1676" alt="immagine" src="https://github.com/user-attachments/assets/d1522ccf-019c-4e71-8f52-8911e9da13ca" />

# Theledate - Local Installation Guide

This document provides instructions on how to set up and run the Theledate application on your local machine for testing and development.

## Description

Theledate calculates the Thelemic date for any day, time, and location. The Thelemic date is based on the astrological positions of the Sun and Moon, and the application uses the Google Gemini API to find geographical data for cities.

## Requirements

1.  **Google Gemini API Key**: The application requires a valid API key to function. You can get one from Google AI Studio.
2.  **Local Web Server**: Because the application uses JavaScript modules, it must be served by a web server. You cannot open the `index.html` file directly in your browser from the filesystem.
3.  **Modern Web Browser**: A browser that supports modern JavaScript features like ES Modules and `importmap` (e.g., Chrome, Firefox, Safari, Edge).

## Setup Instructions

### Step 1: Get the Project Files

Download all the project files (`index.html`, `index.tsx`, `App.tsx`, etc.) and place them together in a single folder on your computer.

### Step 2: Configure Your API Key

The application needs your Gemini API key to search for cities. You need to add it directly to the code for local testing.

1.  Open the file `services/geo.ts` in a text editor.

2.  Locate the following line of code (it should be near the top):
    ```javascript
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    ```

3.  Replace `process.env.API_KEY` with your actual API key inside quotes. It should look like this:
    ```javascript
    const ai = new GoogleGenAI({ apiKey: 'YOUR_API_KEY_HERE' });
    ```
    (Replace `YOUR_API_KEY_HERE` with your key).

4.  Save the `services/geo.ts` file.

**IMPORTANT SECURITY NOTE**: Do not share this file publicly or commit it to a public version control repository (like GitHub) with your API key inside it. This method is suitable for local testing only.

## Running the Application

After configuring your API key, you need to start a local web server from the project's folder.

### Option A: Using Python (Recommended if you have Python installed)

1.  Open your terminal or command prompt.
2.  Navigate to the folder where you saved the project files.
    ```bash
    cd path/to/your/project-folder
    ```
3.  Run the following command.

    If you have Python 3:
    ```bash
    python3 -m http.server
    ```
    If you have Python 2:
    ```bash
    python -m SimpleHTTPServer
    ```

4.  The terminal will display a message like `Serving HTTP on 0.0.0.0 port 8000 (http://0.0.0.0:8000/) ...`.
5.  Open your web browser and go to `http://localhost:8000`.

### Option B: Using Node.js (If you have Node.js/npm installed)

1.  Open your terminal or command prompt.
2.  Navigate to the folder where you saved the project files.
3.  Run the following command to install and use the `serve` package:
    ```bash
    npx serve
    ```
4.  The terminal will show you the local address, usually `http://localhost:3000`.
5.  Open this address in your web browser.

The Theledate application should now be running in your browser.
