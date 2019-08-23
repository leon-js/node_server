var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var isDone = false;
var decLiteral = 6;
var myname = "Leon"; // 同样可以使用模板字符串
var listStr = ['1', '2', '3'];
var listNum = [1, 2, 3];
var testNum2 = [1, 2, 3];
var testStr2 = ['1', '2', '3'];
// 元组 Tuple
var x;
x = ['hello', 10];
// 枚举
var Color;
(function (Color) {
    Color[Color["Red"] = 1] = "Red";
    Color[Color["Green"] = 2] = "Green";
    Color[Color["Blue"] = 3] = "Blue";
})(Color || (Color = {})); // 规定了从1开始
var red = Color.Red;
var colorName = Color[2];
console.log(colorName); // 显示'Green'因为上面代码里它的值是2
var notSure = 4; // 可以为任意值，跳过类型检测
var list = [1, true, "free"]; // 不确定数组数据类型时
function warnUser() {
    console.log("This is my warning message");
}
var unusable = undefined; // 只能赋予undefined以及null
// let test: number = null                    // null\undefined所有类型的子类型，使用--strictNullChecks，会进行严格控制
// 返回never的函数必须存在无法达到的终点
function error(message) {
    throw new Error(message);
}
// 推断的返回值类型为never
function fail() {
    return error("Something failed");
}
// 返回never的函数必须存在无法达到的终点
function infiniteLoop() {
    while (true) {
    }
}
// 类型断言
var someValue = 123;
var strLength1 = someValue.length;
var strLength = someValue.length; // 若使用jsx那么只有as是可用的
var nestedArray = [[1], [2], [3]]; // 嵌套数组
// 解构数组
var input = [1, 2];
function fn(_a) {
    var first = _a[0], second = _a[1];
    console.log(first);
    console.log(second);
}
fn(input);
var o = {
    a: "foo",
    b: 12,
    c: "bar"
};
var aa = o.a, bb = o.b;
var a = o.a, b = o.b;
console.log(aa, bb, a, b);
function keepWholeObject(wholeObject) {
    var a = wholeObject.a, _a = wholeObject.b, b = _a === void 0 ? 1001 : _a; // 给定默认值
    console.log(a, b);
}
keepWholeObject({ a: '123', b: 321 });
keepWholeObject({ a: '123', b: undefined });
function kexuan(a, b, c) {
    if (c === void 0) { c = "hhh"; }
    console.log(a);
    console.log(b);
    console.log(c);
}
kexuan("eee"); // 只给了a一个参数，b设置可选没赋值所以是undefined，c有个默认参数
// 传入默认值
function test(num) {
    if (num === void 0) { num = 123; }
    console.log(num);
}
test(1000);
test();
function printLabel(labelledObj) {
    console.log(labelledObj.label);
}
var myObj = { size: 10, label: "Size 10 Object" };
printLabel(myObj);
function kexuanjkt(kexuanjk) {
    if (kexuanjk.age) {
        console.log("hello my name is " + kexuanjk.name + ", i am " + kexuanjk.age);
    }
    else {
        console.log("hello my name is " + kexuanjk.name);
    }
}
kexuanjkt({ name: 'Jackson' });
kexuanjkt({ name: 'huangjiaqi', age: 18 });
var p1 = { x: 10, y: 20 };
// p1.x = 5 会报错
var readonl = [1, 2, 3, 4];
var readonlarr = readonl;
// readonlarr[0] = 12 // error!
// readonlarr.push(5) // error!
// readonlarr.length = 100 // error!
// readonl = readonlarr // error!
readonl = readonlarr;
var mySearch;
mySearch = function (source, subString) {
    var result = source.search(subString);
    return result > -1; // 已经规定了类型，所以只能返回boolean值
};
console.log(mySearch('123', '2'));
var myArray;
myArray = ["Bob", "Fred"];
var myStr = myArray[0];
var Clock = /** @class */ (function () {
    function Clock(h, m) {
    }
    return Clock;
}());
var square = {};
square.color = "blue";
square.sideLength = 10;
square.penWidth = 5.0;
// 类
var Greeter = /** @class */ (function () {
    function Greeter(message) {
        this.greeting = message;
    }
    Greeter.prototype.greet = function () {
        return "Hello, " + this.greeting;
    };
    return Greeter;
}());
var greeter = new Greeter("world");
// 继承
var Animal = /** @class */ (function () {
    function Animal() {
    }
    Animal.prototype.move = function (distanceInMeters) {
        if (distanceInMeters === void 0) { distanceInMeters = 0; }
        console.log("Animal moved " + distanceInMeters + "m.");
    };
    return Animal;
}());
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Dog.prototype.bark = function () {
        console.log('Woof! Woof!');
    };
    return Dog;
}(Animal));
var dog = new Dog();
dog.bark();
dog.move(10);
dog.bark();
// 私有变量 private
var Animal2 = /** @class */ (function () {
    function Animal2(theName) {
        this.name = theName;
    }
    return Animal2;
}());
console.log(new Animal2("Cat")); // new Animal2("Cat").name 错误: 'name' 是私有的.
// protected 类似 private，但是在派生类中可访问
var Person = /** @class */ (function () {
    function Person(name) {
        this.name = name;
    }
    return Person;
}());
var Employee = /** @class */ (function (_super) {
    __extends(Employee, _super);
    function Employee(name, department) {
        var _this = _super.call(this, name) || this;
        _this.department = department;
        return _this;
    }
    Employee.prototype.getElevatorPitch = function () {
        return "Hello, my name is " + this.name + " and I work in " + this.department + "."; // 如果Person中name是私有private，那么这里this.name将报错
    };
    return Employee;
}(Person));
var howard = new Employee("Howard", "Sales");
console.log(howard.getElevatorPitch());
// console.log(howard.name); // 错误
var Person2 = /** @class */ (function () {
    function Person2(theName) {
        this.name = theName;
    }
    return Person2;
}());
// Employee 能够继承 Person
var Employee2 = /** @class */ (function (_super) {
    __extends(Employee2, _super);
    function Employee2(name, department) {
        var _this = _super.call(this, name) || this;
        _this.department = department;
        return _this;
    }
    Employee2.prototype.getElevatorPitch = function () {
        return "Hello, my name is " + this.name + " and I work in " + this.department + ".";
    };
    return Employee2;
}(Person));
var howard2 = new Employee("Howard", "Sales");
// let john = new Person("John"); // 错误: 'Person' 的构造函数是被保护的.
var Octopus = /** @class */ (function () {
    function Octopus(theName, numberOfLegs) {
        if (numberOfLegs === void 0) { numberOfLegs = 123; }
        this.name = theName;
        this.numberOfLegs = numberOfLegs;
    }
    return Octopus;
}());
var dad = new Octopus("Man with the 8 strong legs");
console.log(dad);
//dad.name
//dad.name = "Man with the 3-piece suit"; // 错误! name 是只读的.
// 存取器  访问器仅在针对ECMAScript 5及更高版本时可用。 所以编译需要使用 tsc -t es5 Basic_types.ts --strictNullChecks
// let passcode = "secret passcode";
// class Employee3 {
//     private _fullName: string;
//     get fullName(): string {
//         return this._fullName;
//     }
//     set fullName(newName: string) {
//         if (passcode && passcode == "secret passcode") {
//             this._fullName = newName;
//         }
//         else {
//             console.log("Error: Unauthorized update of employee!");
//         }
//     }
// }
// let employee = new Employee3();
// employee.fullName = "Bob Smith";
// if (employee.fullName) {
//     console.log(employee.fullName);
// }
// 静态属性
var Grid = /** @class */ (function () {
    function Grid(scale) {
        this.scale = scale;
    }
    Grid.prototype.calculateDistanceFromOrigin = function (point) {
        var xDist = (point.x - Grid.origin.x);
        var yDist = (point.y - Grid.origin.y);
        return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
    };
    Grid.origin = { x: 0, y: 0 };
    return Grid;
}());
var grid1 = new Grid(1.0); // 1x scale
var grid2 = new Grid(5.0); // 5x scale
console.log(grid1.calculateDistanceFromOrigin({ x: 10, y: 10 }));
console.log(grid2.calculateDistanceFromOrigin({ x: 10, y: 10 }));
console.log(Grid.origin);
// 抽象类
var Department = /** @class */ (function () {
    function Department(name) {
        this.name = name;
    }
    Department.prototype.printName = function () {
        console.log('Department name: ' + this.name);
    };
    return Department;
}());
var AccountingDepartment = /** @class */ (function (_super) {
    __extends(AccountingDepartment, _super);
    function AccountingDepartment() {
        return _super.call(this, 'Accounting and Auditing') || this;
    }
    AccountingDepartment.prototype.printMeeting = function () {
        console.log('The Accounting Department meets each Monday at 10am.');
    };
    AccountingDepartment.prototype.generateReports = function () {
        console.log('Generating accounting reports...');
    };
    return AccountingDepartment;
}(Department));
var department; // 允许创建一个对抽象类型的引用
// department = new Department(); // 错误: 不能创建一个抽象类的实例
department = new AccountingDepartment(); // 允许对一个抽象子类进行实例化和赋值
department.printName();
department.printMeeting();
// department.generateReports(); // 错误: 方法在声明的抽象类中不存在
// 构造函数
var Greeter1 = /** @class */ (function () {
    function Greeter1() {
    }
    Greeter1.prototype.greet = function () {
        if (this.greeting) {
            return "Hello, " + this.greeting;
        }
        else {
            return Greeter1.standardGreeting;
        }
    };
    Greeter1.standardGreeting = "Hello, there";
    return Greeter1;
}());
var greeter1;
greeter1 = new Greeter1();
console.log(greeter1.greet());
var greeterMaker = Greeter1;
greeterMaker.standardGreeting = "Hey there!";
var greeter2 = new greeterMaker();
console.log(greeter2.greet());
