# QR Code Generator API

A simple Express-based API for generating QR codes as PNG or JPG files. The API also includes Swagger documentation for easy testing and interaction.

## Features

- Generates QR codes from a provided URL.
- Outputs QR codes in either PNG (with transparent background) or JPG (with white background) format.
- Provides Swagger documentation at `/api-docs` for testing and interaction.

## Getting Started

### Prerequisites

- **Node.js** and **npm** (Node Package Manager) installed. You can download them from [Node.js official site](https://nodejs.org/).

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Mk-1000/qr-code-generator
   cd qr-code-generator-api
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

### Running the Server

Start the server with the following command:

```bash
node index.js
```

The server will run on `http://localhost:3000` by default.

### API Documentation

Swagger documentation is available at:

```
http://localhost:3000/api-docs
```

Use the Swagger UI to test the API and view response examples.

## Usage

### Generate QR Code

Endpoint: `/generate`

**Method**: `GET`

**Query Parameters**:

- `url` (required): The URL to encode in the QR code.
- `format` (required): The format of the QR code. Accepts either `png` or `jpg`.

Example request:

```http
GET /generate?url=https://example.com&format=png
```

**Response**:

- `200 OK`: Returns the generated QR code in the specified format.
- `400 Bad Request`: Returns an error if the URL is missing.
- `500 Internal Server Error`: Returns an error if QR code generation fails.

## Project Structure

```plaintext
qr-code-generator-api/
├── index.js              # Main server file
├── package.json          # Project metadata and dependencies
└── README.md             # Project documentation
```

## Dependencies

- **express**: Web framework for Node.js
- **qrcode**: Library for generating QR codes
- **swagger-jsdoc**: Generates Swagger documentation from JSDoc comments
- **swagger-ui-express**: Serves Swagger documentation through an Express route

## Development

If you want to modify the code or add features, feel free to fork the repository and open a pull request.