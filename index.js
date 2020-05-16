const express = require('express'),
  app = express(),
  upload = require('express-fileupload'),
  csvtojson = require('csvtojson');

const port = process.env.PORT || 3000;

let csvData = 'test';
app.use(upload());

app.get('/', (req, res, next) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/file', (req, res) => {
  /** convert req buffer into csv string ,
   *   "csvfile" is the name of my file given at name attribute in input tag */
  csvData = req.files.csvfile.data.toString('utf8');
  try {
    csvtojson()
      .fromString(csvData)
      .then((json) => {
        json.shift();
        let datas = json

          .map((student) => {
            return `
              <div class="card" style="width:calc(100% - 20px);height:calc(100vh - 30px);background:#e4dbdb;border:10px solid green;page-break-after: always">
                <div class="card-header">
                  <h2>Result Card</h2>
                </div>
                <div class="card-content">
                  SchoolId: ${student.field1} <br>
              Year: ${student.field2} <br>
               regID: ${student.field3} <br>
               First Name: ${student.field4} <br>
               Last Name
: ${student.field5} <br>
               Sex
: ${student.field6} <br>
               Father's Name
: ${student.field7} <br>
               Mother's Name
: ${student.field8} <br>
              Date of Year (BS)		
: ${student['Date of Birth (BS)']} <br>
                Month
: ${student.field10} <br>
                Day
: ${student.field11} <br>
               Caste
: ${student.field12} <br>
              Symbol Number
: ${student.field13} <br>
              Attendance: ${student.field14} <br>
              Nepali[Practical]: ${student['Practical Marks']} <br>
              English
[Practical]: ${student.field16} <br>
              Mathematics
[Practical]: ${student.field17} <br>
              Science
[Practical]: ${student.field18} <br>
              Social Studies and Population Edu.
[Practical]: ${student.field19} <br>
              Health and Physical Education
[Practical]: ${student.field20} <br>
              Moral Education
[Practical]: ${student.field21} <br>
              Occupation and B.T.
[Practical]: ${student.field22} <br>
              Computer
[Practical]: ${student.field23} <br>

 Nepali[Theory]: ${student['Theory Marks']} <br>
              English
[Theory]: ${student.field25} <br>
              Mathematics
[Theory]: ${student.field26} <br>
              Science
[Theory]: ${student.field27} <br>
              Social Studies and Population Edu.
[Theory]: ${student.field28} <br>
              Health and Physical Education
[Theory]: ${student.field29} <br>
              Moral Education
[Theory]: ${student.field30} <br>
              Occupation and B.T.
[Theory]: ${student.field31} <br>
              Computer
[Theory]: ${student.field32} <br>

Student Status: ${student.field33} <br>
                </div>
              </div>
            
          `;
          })
          .join('');

        return res.send(datas);
      });
  } catch {
    return res.send('there is an error');
  }
});

app.listen(port, () => {
  console.log('App listening on port ' + port);
});
