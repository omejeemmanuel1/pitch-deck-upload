# Pitch Deck Upload and Parsing

This project allows users to upload pitch deck documents (PDF, PowerPoint, or Word) and parses the content for display on a dashboard.

## Prerequisites

- Python 3.11
- Flask framework
- SQLAlchemy library
- PyPDF2 library
- python-pptx library
- python-docx library

## Installation

1. Clone the repository:

- git clone <https://github.com/omejeemmanuel1/pitch-deck-upload.git>

2. Install the dependencies:

- pip install flask, flask_sqlalchemy, PyPDF2, pptx, docx, flask_cors

## Usage

1. Start the backend server:

- cd Backend
- flask run

2. Start the frontend development server:

- cd Client
- yarn
- yarn start

3. Access the application in your web browser at `http://localhost:3000`.

4. Upload a pitch deck document by clicking on the "Choose a PDF, PowerPoint file, or Docx" button and selecting a file from your local system, next is to click on the upload button and then click the display content.

5. After the upload is successful, you can view the uploaded pitch deck details on the dashboard. Click the "Display Content" button to see the parsed content.
