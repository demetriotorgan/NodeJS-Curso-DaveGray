const data = {
    employees : require('../model/employees.json'),
    setEmployees: function(data){this.employees = data}
};

const getAllEmployees = (req,res)=>{
    res.json(data.employees);
}

const createNewEmployee = (req,res)=>{
    const newEmployee = {
        id: data.employees[data.employees.length -1].id + 1 || 1,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    }
    if(!newEmployee.firstname || !newEmployee.lastname){
        return res.status(400).json({'msg': 'O primeiro e ultimo nome são obrigatórios'})        
    }
    data.setEmployees([...data.employees, newEmployee]);
    res.status(201).json(data.employees);
}

const updateEmployee = (req,res)=>{
    const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));
    if(!employee){
        return res.status(400).json({
            "message":`Employee ID ${req.body.id} não encontrado`
        });
    }
    if(req.body.firstname) employee.firstname = req.body.firstname;
    if(req.body.lastname) employee.lastaname = req.body.lastname;

    const filteredArray = data.employees.filter(emp=>emp.id !== parseInt(req.body.id));
    const unsortArray = [...filteredArray, employee];
    res.json(data.employees);
}

const deleteEmployee = (req,res)=>{
    const employee = data.employees.find(emp=>emp.id === parseInt(req.body.id));
    if(!employee){
        return res.status(400).json({"message":`Employee ID ${req.body.id} não encontrado`});        
    }
    const filteredArray = data.employees.filter(emp=>emp.id !== parseInt(req.body.id))
    data.setEmployees([...filteredArray]);
    res.json(data.employees);
}

const getEmployee = (req,res)=>{
    const employee = data.employees.find(emp => emp.id === parseInt(req.params.id));
    if(!employee){
        return res.status(400).json({"message":`Employee ID ${req.params.id} não encontrado`})       
    }
    res.json(employee);
}

module.exports = {getAllEmployees, createNewEmployee, updateEmployee, deleteEmployee, getEmployee}