import { EmployeeHandler } from "./pageObjects/EmployeeHandler";
//jest.setTimeout(10000); //may need to set another timeout
//usually the first test "can add a new employee" takes 3000+ms to run on my PC, 
//but sometimes it's 7000+ms and it ends up with error "Async callback was not invoked within the 5000 ms timeout"
const em = new EmployeeHandler();

describe("Employee Manager", () => {
  beforeEach(async () => {
    await em.navigate();
  });
  afterAll(async () => {
    await em.quit();
  });

  it("can add a new employee", async () => {
    await em.addEmployee();
    await em.selectEmployeeByName("New Employee");
    await em.editEmployee({
      name: "test person",
      phone: "1234567890",
      title: "test result",
    });
    await em.saveChanges();
    await em.selectEmployeeByName("Dollie Berry");
    await em.selectEmployeeByName("test person");
    let employee = await em.getEmployeeInfo();
    expect(employee.name).toEqual("test person");
    expect(employee.phone).toEqual("1234567890");
    expect(employee.title).toEqual("test result");
  });

  it("can edit an existing employee", async () => {
    await em.selectEmployeeByName("Bernice Ortiz");
    await em.editEmployee({ title: "Grand Poobah" });
    await em.saveChanges();
    await em.selectEmployeeByName("Phillip Weaver");
    await em.selectEmployeeByName("Bernice Ortiz");
    let employee = await em.getEmployeeInfo();
    expect(employee).toEqual({
      id: 1,
      name: "Bernice Ortiz",
      phone: "4824931093",
      title: "Grand Poobah",
    });
  });

  test("Test adding one more employee", async () => {
    await em.addEmployee(); //adds new employee with default info
    await em.selectEmployeeByName("New Employee");
    await em.editEmployee({name: "Brian Dala", phone: "8583004525", title: "Meteorologist"}); //changes new employee's info
    await em.saveChanges();
    await em.selectEmployeeByName("Dollie Berry");
    await em.selectEmployeeByName("Brian Dala"); //getting back to added employee to check his info
    let employee = await em.getEmployeeInfo();
    expect(employee.name).toEqual("Brian Dala");
    expect(employee.phone).toEqual("8583004525");
    expect(employee.title).toEqual("Meteorologist");
  })

  test("Test cancelling an edit of an employee", async () => {
    await em.selectEmployeeByName("Bernice Ortiz");
    await em.editEmployee({name: "Brian Dala", phone: "8583004525", title: "Meteorologist"});  //editing employee's info
    await em.cancelChanges(); //cancelling changes
    let employee = await em.getEmployeeInfo(); //checking that changes went away
    expect(employee).toEqual({id: 1, name: "Bernice Ortiz", phone: "4824931093", title: "CEO"}); // when cancelled it should stay the same.
    await em.selectEmployeeByName("Phillip Weaver");
    await em.selectEmployeeByName("Bernice Ortiz"); //getting back to employee to check there are no changes
    employee = await em.getEmployeeInfo();
    expect(employee).toEqual({id: 1, name: "Bernice Ortiz", phone: "4824931093", title: "CEO"});
  })

  test("Test that when editing and then navigating away without saving does not save changes", async () => {
    await em.selectEmployeeByName("Bernice Ortiz");
    await em.editEmployee({name: "Brian Dala", phone: "8583004525", title: "Meteorologist",}); //editing employee's info
    await em.selectEmployeeByName("Phillip Weaver");
    await em.selectEmployeeByName("Bernice Ortiz"); //getting back to employee to check there are no changes
    let employee = await em.getEmployeeInfo();
    expect(employee).toEqual({id: 1, name: "Bernice Ortiz", phone: "4824931093", title: "CEO"});
  })
});
