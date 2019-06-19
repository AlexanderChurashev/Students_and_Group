function Student(name, surname, yearBirth) {
    this.name = name;
    this.surname = surname;
    this.yearBirth = yearBirth;
    this.marks = [];
    this.attendance = new Array(25);
    this.attendanceCounter = 0;
}

Student.prototype.getAge = function() {
    return new Date().getFullYear() - this.yearBirth;
};

Student.prototype.getAverageMarks = function() {
    var sumMarks = this.marks.reduce(function(acc, item) {
        return acc + item;
    });
    return sumMarks / this.marks.length;
};

Student.prototype.present = function() {
    if (this.attendance.length > this.attendanceCounter) {
        this.attendance[this.attendanceCounter] = true;
        this.attendanceCounter++;
    }
};

Student.prototype.absent = function() {
    if (this.attendance.length > this.attendanceCounter) {
        this.attendance[this.attendanceCounter] = false;
        this.attendanceCounter++;
    }
};

Student.prototype.getAverageAttendance = function() {
    var positiveAttendance = this.attendance.filter(function(boolean) {
        return boolean === true;
    });
    return positiveAttendance.length / this.attendance.length;
};

Student.prototype.summary = function() {
    var averageAttendance = this.getAverageAttendance();
    var averageMarks = this.getAverageMarks();

    if (averageMarks < 90 && averageAttendance < 0.9) {
        return 'Редиска!';
    } else if (averageMarks < 90 || averageAttendance < 0.9) {
        return 'Норм, но можно лучше';
    } else {
        return 'Ути какой молодчинка!';
    }
};

function Group() {}

Group.prototype = Object.create(Array.prototype);

Group.prototype.attendance = function(surname) {
    if (arguments.length === 0) {
        var positiveStudents = 0;
        for (var i = 0; this.length > i; i++) {
            positiveStudents += this[i].attendance[0];
        }
        return positiveStudents / this.length;
    } else {
        var mapped = this.map(function(element) {
            var studentAttendance = element.getAverageAttendance();
            var studentSurname = element.surname;
            return { student: studentSurname, studentAttendance: studentAttendance };
        });

        var sorted = mapped.sort(function(a, b) {
            return b.studentAttendance - a.studentAttendance;
        });

        var indexed =
            sorted.findIndex(function(element) {
                if (element.student === surname) {
                    return true;
                }
            }) + 1;
        return indexed;
    }
};

Group.prototype.performance = function(surname) {
    if (arguments.length === 0) {
        var groupMarks = 0;
        for (var i = 0; this.length > i; i++) {
            groupMarks += this[i].marks[0];
        }
        return groupMarks / this.length;
    } else {
        var mapped = this.map(function(element) {
            var studentMarks = element.getAverageMarks();
            var studentSurname = element.surname;
            return { student: studentSurname, studentMarks: studentMarks };
        });

        var sorted = mapped.sort(function(a, b) {
            return b.studentMarks - a.studentMarks;
        });

        var indexed =
            sorted.findIndex(function(element) {
                if (element.student === surname) {
                    return true;
                }
            }) + 1;
        return indexed;
    }
};

var firstStudent = new Student('Ivan', 'Ivanov', 1986);
firstStudent.marks = [90, 100, 80, 90];
firstStudent.absent();
firstStudent.absent();
firstStudent.present();
firstStudent.present();
firstStudent.present();
firstStudent.present();

var secondStudent = new Student('Petr', 'Petrov', 1987);
secondStudent.marks = [90, 100, 90, 80];
secondStudent.absent();
secondStudent.absent();
secondStudent.absent();
secondStudent.present();
secondStudent.absent();
secondStudent.present();

var thirdStudent = new Student('Vasya', 'Vasiliev', 1985);
thirdStudent.marks = [60, 70, 80, 60];
thirdStudent.present();
thirdStudent.present();
thirdStudent.present();
thirdStudent.absent();
thirdStudent.present();
thirdStudent.present();

var fourthStudent = new Student('Kolya', 'Philipov', 1988);
fourthStudent.marks = [60, 90, 75, 81];
fourthStudent.present();
fourthStudent.absent();
fourthStudent.present();
fourthStudent.absent();
fourthStudent.present();
fourthStudent.absent();

var newGroup = new Group();

newGroup.push(firstStudent);
newGroup.push(secondStudent);
newGroup.push(thirdStudent);
newGroup.push(fourthStudent);

console.log(newGroup.attendance());
console.log(newGroup.performance());
console.log(newGroup.attendance('Ivanov'));
console.log(newGroup.performance('Philipov'));
console.log(newGroup);
