
/**
 * Given an array of students, generates HTML for all students
 * using {@link buildStudentHtml}.
 * 
 * @param {*} studs array of students
 * @returns html containing all students
 */
function buildStudentsHtml(studs) {
	return studs.map(stud => buildStudentHtml(stud)).join("\n");
}

/**
 * Given a student object, generates HTML. Use innerHtml to insert this
 * into the DOM, we will talk about security considerations soon!
 * 
 * @param {*} stud 
 * @returns 
 */
function buildStudentHtml(stud) {
	let html = `<div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">`;
    html += `<h2>${stud.name.first} ${stud.name.last}</h2>`;
    html += `<h5>${stud.major}</h5>`;
    html += `<p>${stud.name.first} is taking ${stud.numCredits} credits and ${stud.fromWisconsin == true ? 'is' : 'is not'} from Wisconsin.</p>`;
    html += `<p>They have ${stud.interests.length} interests, including... </p> <ul>`;
    html += stud.interests.map(interest => `<li>${interest}</li>`).join("\n");
    html += `</ul></div>`

    return html;
}

document.addEventListener("DOMContentLoaded", function() { 
    // Once the document is loaded, fetch the student data
    fetchStudentData();
});

let allStudents = [];

function fetchStudentData() {
    fetch("https://cs571.org/api/f23/hw2/students", {
		method: "GET",
		headers: {
			"X-CS571-ID": CS571.getBadgerId()
		}
	})
	.then(res => {
		if (res.status === 200 || res.status === 304) {
			return res.json()
		} else {
			throw new Error();
		}
	})
	.then(data => {
		allStudents = data;

		console.log(data);
		document.getElementById("num-results").innerText = data.length;

		const studentsDiv = document.getElementById("students");
		studentsDiv.className += " row";
		studentsDiv.innerHTML = buildStudentsHtml(data);
	})
	.catch(err => {
		console.log('There was a problem with the fetch operation:', err.message);
	})
}

function handleSearch(e) {
	e.preventDefault();

	// TODO
	// For Step 5, implement the rest of this function!
	let nameSearch = document.getElementById("search-name").value.toLowerCase().trim();
	let majorSearch = document.getElementById("search-major").value.toLowerCase().trim();
	let interestSearch = document.getElementById("search-interest").value.toLowerCase().trim();

	const filteredStudents = allStudents.filter(stud => {
		const fullName = `${stud.name.first} ${stud.name.last}`.toLowerCase();
	
		if (nameSearch && !fullName.includes(nameSearch)) {
            return false;
        }
        
        if (majorSearch && stud.major.toLowerCase().indexOf(majorSearch) === -1) {
            return false;
        }

        if (interestSearch && !stud.interests.some(interest => interest.toLowerCase().includes(interestSearch))) {
            return false;
        }
        
        return true;
    });

    // Display filtered students
    document.getElementById("num-results").innerText = filteredStudents.length;
    document.getElementById("students").innerHTML = buildStudentsHtml(filteredStudents);
}

document.getElementById("search-btn").addEventListener("click", handleSearch);
