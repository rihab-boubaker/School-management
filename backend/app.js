const express = require("express");
const app = express();
const bodyParser = require("body-parser");
//impoport bcrypt module
const bcrypt = require("bcrypt");
//import multer module
const multer = require("multer");
//impoport path module
const path = require("path");
//impoport axios module
const axios = require("axios");
//impoport json webtoken module
const jwt = require("jsonwebtoken");
//impoport express session module
const session = require("express-session");
//import mongoose module
const mongoose = require("mongoose");
//connect express application with db via longoose

mongoose.connect('mongodb://127.0.0.1:27017/schoolDB');
// Your app configuration and routes go here
//configuration
//send json responses
//.use pour configurer notre app
app.use(bodyParser.json());
//get object from request
app.use(bodyParser.urlencoded({ extended: true }));
// Security configuration
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, Accept, Content-Type, X-Requested-with, Authorization, expiresIn"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, DELETE, OPTIONS, PATCH, PUT"
    );
    next();
});

//path configurationn(shortcut)
app.use('/images', express.static(path.join('backend/images')))

const IMAGE_MIME_TYPE = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'image/pdf': 'pdf',
}
const PDF_MIME_TYPE = {

    'application/pdf': 'pdf',
}

const storage = multer.diskStorage({
    // destination
    destination: (req, file, cb) => {
        const isValidImage = IMAGE_MIME_TYPE[file.mimetype];
        const isValidPDF = PDF_MIME_TYPE[file.mimetype];
        if (isValidImage) {
            // Save images in the "images" directory
            cb(null, 'backend/images');
        } else if (isValidPDF) {
            // Save PDFs in the "pdfs" directory
            cb(null, 'backend/pdfs');
        } else {
            // Handle invalid file types
            cb(new Error("Mime type is invalid"));
        }
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const extension = IMAGE_MIME_TYPE[file.mimetype] || PDF_MIME_TYPE[file.mimetype];

        if (!extension) {
            cb(new Error("Mime type is invalid"));
        } else {
            const fileName = name + '-' + Date.now() + '-crococoder-' + '.' + extension;
            cb(null, fileName);
        }
    }
});

// hedhi lel session w token
const secretKey = 'Croco2023Venus';
app.use(session({
    secret: secretKey,
}));



//models importation : dima tabda bel majus


const User = require("./models/user");
const Course = require("./models/course");
const Note = require("./models/note");



//signup
app.post("/users/signup", multer({ storage: storage }).single('img'), (req, res) => {
    console.log("here into bl signup", req.body);
    bcrypt.hash(req.body.pwd, 10).then((cryptedPwd) => {
        console.log("here crypted pwd", cryptedPwd);
        req.body.pwd = cryptedPwd;
        req.body.avatar = "http://localhost:3000/images/" + req.file.filename;

        let user = new User(req.body);
        user.save((err, doc) => {
            console.log("here error", err)
            console.log("here doc", doc)
            if (err) {
                if (err.errors.email) {
                    // 0 : email exists
                    res.json({ msg: "0" });
                }
            } else {
                res.json({ msg: "success" });
            }
        });

    });

});

//signup teacher
app.post("/users/signupTeacher", multer({ storage: storage }).single('pdf'), (req, res) => {
    console.log("here into bl signup", req.body);
    bcrypt.hash(req.body.pwd, 10).then((cryptedPwd) => {
        console.log("here crypted pwd", cryptedPwd);
        req.body.pwd = cryptedPwd;
        req.body.pdf = "http://localhost:3000/pdfs/" + req.file.filename;
        req.body.status = "nok";
        let user = new User(req.body);
        user.save((err, doc) => {
            console.log("here error", err)
            console.log("here doc", doc)
            if (err) {
                if (err.errors.email) {
                    // 0 : email exists
                    res.json({ msg: "0" });
                }
            } else {
                res.json({ msg: "success" });
            }
        });

    });

});

//signup parent
app.post("/users/signupParent", (req, res) => {
    console.log("here into bl signup", req.body);

    // Find the child number in the database
    User.findOne({ tel: req.body.childNumber }).then((doc) => {
        console.log("here doc after searching by tel", doc);
        if (!doc) {
            // Child number doesn't exist, respond with a specific message
            res.json({ msg: "Child number not found" });
        } else {
            // Continue with the parent registration process
            bcrypt.hash(req.body.pwd, 10).then((cryptedPwd) => {
                console.log("here crypted pwd", cryptedPwd);
                req.body.pwd = cryptedPwd;
                let user = new User(req.body);
                user.save((err, doc) => {
                    console.log("here error", err)
                    console.log("here doc", doc)
                    if (err) {
                        if (err.errors.email) {
                            // 0: Email exists
                            res.json({ msg: "0" });
                        }
                    } else {
                        // Parent registration successful
                        res.json({ msg: "success" });
                    }
                });
            });
        }
    });
});

//signup admin
app.post("/users/signupAdmin", (req, res) => {
    console.log("here into bl signup", req.body);
    bcrypt.hash(req.body.pwd, 10).then((cryptedPwd) => {
        console.log("here crypted pwd", cryptedPwd);
        req.body.pwd = cryptedPwd;


        let user = new User(req.body);
        user.save((err, doc) => {
            console.log("here error", err)
            console.log("here doc", doc)
            if (err) {
                if (err.errors.email) {
                    // 0 : email exists
                    res.json({ msg: "0" });
                }
            } else {
                res.json({ msg: "success" });
            }
        });

    });

});


//login 
app.post("/users/login", (req, res) => {
    User.findOne({ tel: req.body.tel }).then((user) => {
        if (!user) {
            // User with the provided tel doesn't exist
            return res.json({ msg: "Please check your tel" });
        }

        // Check if the provided password matches the stored hashed password
        bcrypt.compare(req.body.pwd, user.pwd, (err, pwdResult) => {


            if (!pwdResult) {
                // Password doesn't match
                return res.json({ msg: "Please check your password" });
            }

            // Password is correct, create a userToSend object with necessary details
            const userToSend = {
                id: user._id,
                fName: user.firstName,
                lName: user.lastName,
                role: user.role,
                status: user.status
            };

            // Generate a JWT token
            const token = jwt.sign(userToSend, secretKey, { expiresIn: '1h' });

            res.json({ result: token, msg: "Success", role: user.role, status: user.status });
        });
    })
        .catch((error) => {
            // Handle any errors that occur during the database query
            res.status(500).json({ msg: "An error occurred while processing your request" });
        });
});


//get all teachers
app.get("/users/teachers", (req, res) => {
    ///traitement de la req
    console.log("here into bl : get all teacher");
    User.find({ role: 'teacher' }).then(
        (data) => {
            //retourner la reponse sous format json
            res.json({ teachers: data });
        }
    )

});

//get all parents
app.get("/users/parents", (req, res) => {
    ///traitement de la req
    console.log("here into bl : get all parents");
    User.find({ role: 'parent' }).then(
        (data) => {
            //retourner la reponse sous format json
            res.json({ parents: data });
        }
    )

});

//validate teacher
app.put("/users/teachers/:teacherId/validate", (req, res) => {
    const teacherId = req.params.teacherId;

    User.updateOne({ _id: teacherId }, { status: "ok" })
        .then((result) => {

            return res.json({ message: "Teacher validated successfully" });
        })
        .catch((err) => {
            console.error(err);
            return res.status(500).json({ error: "Failed to validate teacher" });
        });
});


//delete teacher by id
app.delete("/users/:id", (req, res) => {
    ///traitement de la req
    console.log("here into bl: delete teacher", req.params.id);
    let id = req.params.id;
    User.deleteOne({ _id: id }).then((data) => {
        console.log("here data after delete", data)
        data.deletedCount == 1 ?
            res.json({ msg: "delete with success" }) : res.json({ msg: "not deleted" });

    });

});

//get all students
app.get("/users/students", (req, res) => {
    ///traitement de la req
    console.log("here into bl : get all students");
    User.find({ role: 'student' }).then(
        (data) => {
            //retourner la reponse sous format json
            res.json({ students: data });
        }
    )

});

//add course
app.post("/courses", (req, res) => {
    console.log("Received a request to add a course:", req.body);

    try {
        // Find the teacher by ID
        User.findById(req.body.teacherId).then((teacher) => {
            if (!teacher) {
                return res.status(404).json({ msg: "Teacher not found" });
            }

            // Create a new Course object
            const course = new Course({
                courseName: req.body.courseName,
                courseDuration: req.body.courseDuration,
                courseDescription: req.body.courseDescription,
                teacher: req.body.teacherId,
            });

            // Save the Course object
            course.save((err, doc) => {
                if (err) {
                    return res.status(500).json({ msg: "Error creating course", error: err.message });
                }

                // Push the course into the teacher's courses array
                
                teacher.courses.push(course);

                // Save the teacher with the updated courses array
                teacher.save((err) => {
                    if (err) {
                        return res.status(500).json({ msg: "Error updating teacher", error: err.message });
                    }

                    res.status(201).json({ msg: "Course added successfully" });
                });
            });
        });
    } catch (error) {
        res.status(500).json({ msg: "Internal server error", error: error.message });
    }
});


//get all teacher courses
app.get("/courses/teacherCourses/:teacherId", (req, res) => {
    // Extract the teacherId from the URL parameters
    const teacherId = req.params.teacherId;

   
    User.findById(teacherId)
        .populate('courses') // Populate the 'courses' field, assuming it's a reference to the Course model
        .then((user) => {
            if (!user) {
                res.status(404).json({ error: "Teacher not found" });
            } else {
                // Get the courses from the populated 'courses' field of the user
                const courses = user.courses;

                // Return the courses as JSON
                res.json({ courses });
            }
        })
        .catch((err) => {
            console.error("Error fetching user:", err);
            res.status(500).json({ error: "Internal server error" });
        });
});


//delete my course
app.delete("/courses/:id", (req, res) => {
    ///traitement de la req
    console.log("here into bl: delete course", req.params.id);
    let id = req.params.id;
    Course.deleteOne({ _id: id }).then((data) => {
        console.log("here data after delete", data)
        data.deletedCount == 1 ?
            res.json({ msg: "delete with success" }) : res.json({ msg: "not deleted" });



    });

});

//get course by id ( pour recuper les donner dans le fichier edit)
app.get("/courses/:id", (req, res) => {
    ///traitement de la req
    console.log("here into bl : get course by id");

    let id = req.params.id;


    Course.findOne({ _id: id }).then((data) => {
        res.json({ course: data });
    });

});

//edit course
app.put("/courses", (req, res) => {
    ///traitement de la req
    console.log("here into bl: edit course", req.body);
    let newCourse = req.body;
    Course.updateOne({ _id: newCourse._id }, newCourse).then((data) => {
        res.json({ msg: "edited with success" });

    })

    res.json({ msg: "updated with success" });

});

//get all courses for admin
app.get("/courses", (req, res) => {
    ///traitement de la req
    console.log("here into bl : get all courses");
    Course.find()
        .populate('teacher', 'firstName lastName')
        .then((courses) => {
            res.json({ courses });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});


//assignment
app.post('/courses/assign', (req, res) => {


    // Extract courseId and studentId from the request body
    const { courseId, studentId } = req.body;

    // Find the course by its ID
    Course.findById(courseId)
        .then(course => {
            if (!course) {
                return res.status(404).json({ message: 'Course not found' });
            }

           
            course.students.push(studentId);

          
            return course.save();
        })
        .then(() => {
           
            return User.findById(studentId);
        })
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'Student not found' });
            }

          
            user.enrolledCourses.push(courseId);

            // Save the updated user document
            return user.save();
        })
        .then(() => {
            // Return a success response
            res.status(200).json({ message: 'Student assigned to the course successfully' });
        })
        .catch(error => {
            // Handle errors and return an error response
            console.error(error);
            res
                .status(500)
                .json({ error: 'An error occurred while assigning the student to the course' });
        });
});



//display the assigned courses for student
app.get('/courses/assignedCourses/:studentId', (req, res) => {
    try {
        const studentId = req.params.studentId;

        // Find the user by ID and populate their enrolledCourses
        User.findById(studentId)
            .populate({
                path: 'enrolledCourses',
                populate: {
                    path: 'teacher',
                    select: 'firstName lastName' // Select the teacher's firstName and lastName
                }
            })
            .then((user) => {
                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }

                // Extract enrolled courses from the user object
                const enrolledCourses = user.enrolledCourses;

                res.status(200).json({ enrolledCourses });
            })
            .catch((error) => {
                console.error(error);
                res.status(500).json({ message: 'Internal Server Error' });
            });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});



//display the students of the course
app.get('/courses/students/:courseId', (req, res) => {
    const courseId = req.params.courseId;

   
    Course.findById(courseId)
        .populate('students').then((course) => {
            if (!course) {
                return res.status(404).json({ message: 'Course not found' });
            }

          
            const enrolledStudents = course.students;

            res.status(200).json(enrolledStudents);
        })
        .catch((error) => {
            console.error('Error fetching enrolled students:', error);
            res.status(500).json({ message: 'Internal server error' });
        });
});


// Add a note to a course
app.post('/notes', (req, res) => {
    const { studentId, courseId, note, evaluation } = req.body;


    // Create a new note
    const newNote = new Note({
        student: studentId,
        course: courseId,
        note: note,
        evaluation: evaluation,
    });

    // Save the note to the database
    newNote.save((error) => {
        if (error) {
            console.error('Error adding note:', error);
            return res.status(500).json({ error: 'Server error' });
        }

        res.status(201).json({ message: 'Note added successfully' });

    });


});

//display the note of a specific student
app.get('/notes/:courseId/:studentId', (req, res) => {
    const { studentId, courseId } = req.params; 

   
    Note.find({ student: studentId, course: courseId })
        .populate('student', 'firstName lastName') 
        .populate('course', 'courseName') 
        .then((notes) => {
            if (!notes) {
                return res.status(404).json({ error: 'Notes not found' });
            }

            res.status(200).json(notes);
        })
        .catch((error) => {
            console.error('Error fetching notes:', error);
            res.status(500).json({ error: 'Server error' });
        });
});


//search teachers
app.post('/users/searchTeachers', (req, res) => {
    console.log(req.body.speciality);

   
    User.find({ speciality: req.body.speciality, role: "teacher" }, (err, teachers) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'An error occurred while searching for teachers.' });
        }

      
        res.json({ teachers });
    });
});

//search courses by child number
app.post('/courses/searchbyNumber', (req, res) => {
    console.log("here", req.body.childNumber)
    User.findOne({ tel: req.body.childNumber })
        .populate({
            path: 'enrolledCourses',
            populate: { path: 'teacher', select: 'firstName lastName' } 

        })
        .then((child) => {
            console.log("here doc after searching number", child);
            if (!child) {
                res.json({ msg: "Please check the phone number." });
            }
            console.log("gggggg", child._id)
            const childId = child._id;
            const courses = child.enrolledCourses;

            ////////////////

            res.status(200).json({ courses, childId });



        })


})


// Export the Express app
module.exports = app;





