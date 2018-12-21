// apiRoutes for employee array define path to data file used (employees.js)

const employees = require('../data/employees');

//what is processed/returned

module.exports = function(app) {
 //API/Employees get to display all employees (Data.employees.js) JSON format

  app.get('/api/employees', function(req, res) {
    res.json(employees);
  });

 //API input (post) for new entries
// Why the infinity declaration -- borrowed this -- need to ask TA for clarification

  app.post('/api/employees', function(req, res) {

    const matching = {
      name: '',
      photo: '',
      employeeDifference: Infinity
    };

  //get form data
    const userData = req.body;
    const userScores = userData.scores;

    // declare holder for "delta" scores

    let delta;// has to be outside of FOR loop so it survives loop

    // FOR loop through employees.js array
    for (let i = 0; i < employees.length; i++) {
      const currentEmployee = employees[i];
      delta = 0;

      // get each employees scores for same questions
      for (let j = 0; j < currentEmployee.scores.length; j++) {
        const currentEmployeeScore = currentEmployee.scores[j];
        const currentUserScore = userScores[j];

    //sum up the question deltas to get total (smallest total implies closest match for new persons needed)
    // Total = (Q1 |A-B| + Q2 |A-B| + Q3 |A-B| +...........) [not my solution, why did mine fail?????  need to understand]
        delta += Math.abs(parseInt(currentUserScore) - parseInt(currentEmployeeScore));
      }

      // identify closest matching score for new person -- (if new one is less than last low score, then discard old, adn hold new score)
      if (delta <= matching.employeeDifference) {
       
        matching.name = currentEmployee.name;
        matching.photo = currentEmployee.photo;
        matching.employeeDifference = delta;
      }
    }

  //store new persons survey profile into employees.js array (it grows with each person)
    employees.push(userData);

    res.json(matching);
  });
};
