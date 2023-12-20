import { Button, Container, Form, Row, Col, Pagination } from "react-bootstrap";
import { useEffect, useState } from "react";
import Student from "./Student";

const Classroom = () => {
    const [students, setStudents] = useState([]);
    const [showStudents, setShowStudents] = useState([]);
    const [nameSearch, setNameSearch] = useState("");
    const [majorSearch, setMajorSearch] = useState("");
    const [interestSearch, setInterestSearch] = useState("");
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetch("https://cs571.org/api/f23/hw4/students", {
            headers: {
                "X-CS571-ID": "bid_36fdfcdcff31ac2e820585fbbbd25efbf1f9f916ea20fb1df4b5825bbf932c04"
            }
        }).then(res => res.json()).then(data => {
            setStudents(data);
            setShowStudents(data);
            console.log(data);
        })
    }, []);

    useEffect(() => {
        const handleSearch = () => {
            const filteredStudents = students.filter(student => {
                const fullName = `${student.name.first} ${student.name.last}`;

                return (
                    (fullName.toLowerCase().includes(nameSearch.trim().toLowerCase()) || !nameSearch) &&
                    (student.major.toLowerCase().includes(majorSearch.trim().toLowerCase()) || !majorSearch) &&
                    (student.interests.some(interest => interest.toLowerCase().includes(interestSearch.trim().toLowerCase())) || !interestSearch)
                );
            });

            setShowStudents(filteredStudents);
            setPage(1);
        };

        handleSearch();
    }, [nameSearch, majorSearch, interestSearch, students]);

    const buildPaginator = () => {
        const itemsPerPage = 24;
        const numPages = Math.ceil(showStudents.length / itemsPerPage);
        const pages = [];

        pages.push(
            <Pagination.Prev 
                key="previous" 
                disabled={page === 1 || showStudents.length === 0} 
                onClick={() => setPage(prevPage => Math.max(1, prevPage - 1))} 
            />
        );
    
        for (let i = 1; i <= numPages; i++) {
            pages.push(
                <Pagination.Item key={i} active={page === i} onClick={() => setPage(i)}>
                    {i}
                </Pagination.Item>
            );
        }

        pages.push(
            <Pagination.Next 
                key="next" 
                disabled={page === numPages || showStudents.length === 0} 
                onClick={() => setPage(prevPage => Math.min(numPages, prevPage + 1))}
            />
        );
    
        return pages;
    };

    return <div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <h1>Badger Book - Fall 2023</h1>
        <p>Search for students below!</p>
        <hr />

        <Form>
            <Form.Label htmlFor="searchName">Name</Form.Label>
            <Form.Control id="searchName" value={nameSearch} onChange={(e) => setNameSearch(e.target.value)}/>
            <Form.Label htmlFor="searchMajor">Major</Form.Label>
            <Form.Control id="searchMajor" value={majorSearch} onChange={(e) => setMajorSearch(e.target.value)}/>
            <Form.Label htmlFor="searchInterest">Interest</Form.Label>
            <Form.Control id="searchInterest" value={interestSearch} onChange={(e) => setInterestSearch(e.target.value)}/>
            <br />
            <Button variant="neutral" onClick={() => { setNameSearch(""); setMajorSearch(""); setInterestSearch(""); setShowStudents(students);}}>Reset Search</Button>
        </Form>

        <p>There are {showStudents.length} student(s) matching your search.</p>

        <Container fluid>
            <Row>
            { /* TODO Students go here! */
               showStudents.slice((page - 1) * 24, page * 24).map((student, index) => (
                    <Col key={index} xs={12} sm={6} md={4} lg={3} xl={2}>
                        <Student key={index} {...student} />
                    </Col>
                ))
            }
            </Row>
        </Container>
        
        <Pagination>
            {buildPaginator()}
        </Pagination>
    </div>
}

export default Classroom;