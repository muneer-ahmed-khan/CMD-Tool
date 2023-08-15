# A Command Tool based on Chat GPT 

A command line utility tool based on chat gpt connected to with [OpenAI platform](https://openai.com/).

To run the program first you need to have [OpenAI](https://openai.com/) API_KEYs for project to work with you.


**you can follow the article how to generate API_KEYs for [OPENAI](https://www.maisieai.com/help/how-to-get-an-openai-api-key-for-chatgpt).**


## Project Overview
1) This project is a simple CLI application that uses the Open AI API and provides an interface for users to interact with it using text commands.
2) The project is a simple CLI application that allows users to interact with the model using natural language and get responses back from it.


**ChatGPT** - This is a simple CLI application that uses the Open AI API and allows you to interact with it via text

- The project is a Typescript based Node js Application that uses the Open AI API and it's chat-gpt model to generate text from user input.

- This project is a simple CLI application that uses the Open AI's API and allows users to interact with their own custom trained model of conversation.

- The project is aimed at providing an easy way for users to interact with the model and get results in real time.

- The project is aimed at building an AI assistant that can perform various tasks like:

- Searching for information from the internet or any other source
of data (e.g., Wikipedia, Google etc.)
- Performing simple calculation and conversions.

- It uses OpenAI's API and its pre trained models to generate responses to user queries.

- I have built this project using Node js programming language with typescript.

## How to run Project
there are two ways run the command line tool.

    - Interactive mode.
    - Read from input file.

### Interactive Mode
    For this mode you only need Open AI API_KEY to work. it will ask user for prompt and user will provide a question the program will chat gpt will respond back.

### File Mode
    For File Mode you need put you input file in csvInput directory first.

    *the input file format is as follows*
    ```javascript
    Input
    How old are you
    what do you do
    how are you look like
    ``` 

    you can get example from csv Input directory **test.csv** file

    the program will generate a output file with same name and output columns separated with | pipe operate.  

## How to run the Program

`npm i`

`npm run build`

`npm start`







