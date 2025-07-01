# Sustainable-System
***Sustainable system for water in hotels (graduating project)***

   One of the common problems for Hotels owners/managers is the Utilization of water usage by guests, since the water consumption rate is unlimited for each client of the Hotels, many of the clients consume water in an Excessive way;  which will impact the hotels in high water fees and also will impact the country that include these hotels, and this will lead to violate the concept of water sustainability.
   
   The methodology I followed to solve this problem is to build a system of software and hardware that monitors the water usage by hour for each guest and then apply a certain discount in guest booking price for those who consumed water under a predetermined rate, which will encourage guests to decrease their usage of water.

This project consists of six applications conducted by a full stack development beside the SRS document that has a detailed specification about the project, and here is a brief explanation about each application:

| Application    |  description   | Technology/Tool|
|----------------|----------------|----------------|
| IoT Specific  | a backend application that simulates the internet of things device and sends a predetermined ammount of water value and time as a dummy data with a fixed room number to the Backend API (usded in prototyping and testing manners)  | Node js, child_process.exec and curl  |
| IoT Random | a backend application that simulates the internet of things device and sends a dummy data of water value, room number and time randomly to the Backend API (usded in prototyping and testing manners) | Node js, child_process.exec and curl  |
| Backend API | an API that should be run constantly to ensure the connection between IoT devices and the Database, it handles the IoT devices requests and send them properly to the Database  | Node js, Express js, body-parser and odbc  |
| DataBase   | the Database used in this system is SQL Server Management Studio (SSMS) and its consists of three components :<br><br><table><tr><td><strong>Component</strong></td><td><strong>Role</strong></td></tr><tr><td>SSMS</td><td>Frontend GUI for writing SQL and managing DB</td></tr><tr><td>SQL Server</td><td>Actual engine that stores and processes data</td></tr><tr><td>Operating server</td><td>Host for the SQL Server instance and database files</td></tr></table>   | Transact-SQL (T-SQL) and sp_executesql  |
| Frontend API  | an API that should be run constantly to ensure the connection between the Web application and the Database, it handles the requests properly in a mutual way from and to the Web application  | Node js, Express js, http, cors, odbc and json  |
| Web page  | a Web page that should be run constantly on the Booking staff main computer or even in a separate one, a GUI looking that takes guest data when checking out, decides if the guest deserves a discount and shows a graph of guest's water usage all over his booking duration   | HTML5, CSS3, JavaScript (ES6+), Dom API, Chart.js and fetch() |


