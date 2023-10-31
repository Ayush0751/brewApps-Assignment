# brewApps-Assignment

## API endpoints and their usage
### Postman collection link: https://www.postman.com/altimetry-architect-37906949/workspace/brewapps/collection/20147542-0aa27d74-9dc9-4c22-8698-7eb11edb11a7?action=share&creator=20147542
1. Get request - For getting all the books in the library
	url: https://brewapps-library.onrender.com/api/library
	
2. Get request(by id) - For getting all the books in the library by an id
	url: http://localhost:3000/api/library/id

	example: https://brewapps-library.onrender.com/api/library/653feb8efda601286f319d81
	
3. Post request - For creating a book in the library
	url: https://brewapps-library.onrender.com/api/library/addBook

	example: 
		{
    			"title": "DSA with java",
    			"author": "unknown",
    			"summary": "Book not to look for"
		}

4. Patch request - For updating any book in the library by its id
	url: https://brewapps-library.onrender.com/api/library/updateBookById/id
	example:
		{
    			"title": "DSA with java2.0",
    			"author": "unknown2.0",
    			"summary": "Book not to look for2.0"
		}

5. Delete request - For deleting a book by its id
	url: https://brewapps-library.onrender.com/api/library/deleteBook/id
	example: https://brewapps-library.onrender.com/api/library/deleteBook/653fe5caacc29df6b332

## Instructions to set up and run the application locally
To run the application locally
  first clone the git repository in a folder. 
  Then, open the folder and run npm install command. 
  Once all the dependencies are installed, run npm start and the application will be live on localhost:3000.
  To test the API, copy and paste the link(http://localhost:3000/api/library/ or https://brewapps-library.onrender.com/api/library) into Postman and call the API     endpoints according to the documentation provided.

## Assumptions made while creating the API
I assumed that all the fields in the book schema are required.
I thought of creating a user login too, but later thought the library needed to be public so I didn't keep any record of the user who created a book in the library. 
Assumed that update and delete will be only done with id.
Made fetching of books in the home route, and added route for the other operations.
Assumed that while creating and updating a book, its title and author should not contain an empty value and the summary should be of at least 5 characters. If any users violate these rules, an error will be thrown stating that the inputs are invalid.
If any user tries to get, delete, or update a book by the id that is non-existent, an error will be thrown stating that no book is found with this ID.
