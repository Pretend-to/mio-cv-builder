# Mio-Cv-Builder

[EN](README-en-us.md) | [中文](README.md)


Mio-Cv-Builder is a resume builder application that allows users to create and customize their resumes. It utilizes Vue 3 for the frontend and Node.js for the backend server. Real-time communication is achieved through HTTP, and the backend leverages Puppeteer to generate resumes that can be exported as images or PDF files.

## Demo

You can check out a demo of the application [here](https://cv.krumio.com).

## Features

- Create and customize resumes
- Real-time communication between frontend and backend
- Export resumes as images or PDF files

## TODO

- Add more templates
- Add more customization options

## Technologies Used

- Vue 3
- Node.js
- HTTP communication
- Puppeteer

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Pretend-to/mio-cv-frontend
```

2. Navigate to the project directory:

```bash
cd Mio-Cv-Builder
```

3. Change the frontend if it's necessary:

```bash
cd frontend
pnpm install
npm run dev
...
npm run build
```

4. Install the dependencies for the backend:

```bash
cd backend
npm install
```

## Usage

To use the application, you just need to start the backend server and access the application in your browser.(Recommend to use Nginx as a reverse proxy)


1. Start the backend server on the default port 5400:

```bash
cd backend
node server.js
```

2. Access the application in your browser:

```
http://localhost:5400
```

## Contributing

Contributions are welcome! If you find any bugs or have suggestions for improvement, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
