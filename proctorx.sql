-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 08, 2023 at 09:01 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `proctorx`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_user`
--

CREATE TABLE `admin_user` (
  `id` int(11) NOT NULL,
  `name` varchar(40) NOT NULL,
  `password` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin_user`
--

INSERT INTO `admin_user` (`id`, `name`, `password`) VALUES
(1, 'admin', '$2a$10$SLZuLiwCTem8UJ1Z/dzZ.uKFTdarjv4gkL1pEShgXzeQDSU/kHciW');

-- --------------------------------------------------------

--
-- Table structure for table `attended_test`
--

CREATE TABLE `attended_test` (
  `id` int(11) NOT NULL,
  `test_id` int(11) NOT NULL,
  `user_id` varchar(25) NOT NULL,
  `attended_date` datetime NOT NULL DEFAULT current_timestamp(),
  `score` float NOT NULL DEFAULT 0,
  `time_taken` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `attended_test`
--

INSERT INTO `attended_test` (`id`, `test_id`, `user_id`, `attended_date`, `score`, `time_taken`) VALUES
(1, 15, '4CB19CS089', '2023-05-07 13:22:20', 0.75, 0),
(2, 13, '4CB19CS089', '2023-05-07 13:24:36', 1, 0);

--
-- Triggers `attended_test`
--
DELIMITER $$
CREATE TRIGGER `attended_tests_trigger` AFTER INSERT ON `attended_test` FOR EACH ROW UPDATE `students` s set s.tests_attended = s.tests_attended+1 WHERE usn = new.user_id
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `updateStudentScore` AFTER UPDATE ON `attended_test` FOR EACH ROW UPDATE `students` s set s.total_score = s.total_score+old.score WHERE usn = new.user_id
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `branches`
--

CREATE TABLE `branches` (
  `branch_id` int(11) NOT NULL,
  `branch_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `branches`
--

INSERT INTO `branches` (`branch_id`, `branch_name`) VALUES
(1, 'Computer Science and Design'),
(2, 'Computer Science and Engineering'),
(3, 'Electronincs and Engineering'),
(4, 'Information Science and Engineering'),
(5, 'Artificial Intelligence and Machine learning');

-- --------------------------------------------------------

--
-- Table structure for table `faculty`
--

CREATE TABLE `faculty` (
  `id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `branch` int(11) DEFAULT NULL,
  `employee_id` varchar(25) NOT NULL,
  `password` text DEFAULT NULL,
  `verified` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `faculty`
--

INSERT INTO `faculty` (`id`, `name`, `email`, `branch`, `employee_id`, `password`, `verified`) VALUES
(1, 'Ram', 'ram@gmail.com', 2, 'ex1010', '$2a$10$Qv86peGrAVLWxIq1RfhlyujIU6YVUuH7zwrCBamNCdLDW0f3L1eau', 1),
(2, 'Krishna', 'krishna@gmail.com', 2, 'ey2010', '$2a$10$ciJNjkiRPJaeA5VV0LRIauRUsytg1VPdckzAiVq5Jg/mH/C4QOwke', 0),
(3, 'Naveen', 'naveen@gmail.com', 2, 'bp1021', '$2a$10$rRK7vxamv.FgE2wqGK7sf.Fqp1boDDqQaC6SaNGpV8v09Kp2kQBP.', 1),
(4, 'Anil', 'anil@gmail.com', 3, 'bx1032', '$2a$10$c02/a2pbjPpBiF.WA3h72e9m7f9RghBqmbmXHYBZdSfz6Xmy1EK6u', 0),
(6, 'Testuser', 'testuser@gmail.com', 1, 'fx505dt', '$2a$10$wvLlwWbw.tg2ipaiAZnRsOGs4RdT7U/WlSaYBKhxMlFBc7qtpQDPG', 0);

-- --------------------------------------------------------

--
-- Table structure for table `mcq_topic`
--

CREATE TABLE `mcq_topic` (
  `q_id` int(11) NOT NULL,
  `topic_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `mcq_topic`
--

INSERT INTO `mcq_topic` (`q_id`, `topic_id`) VALUES
(1, 1),
(6, 1),
(7, 1),
(8, 6),
(9, 6),
(10, 6),
(11, 6),
(12, 6),
(13, 6),
(14, 6),
(15, 6),
(16, 6),
(17, 6),
(18, 6),
(19, 6),
(20, 6),
(21, 6),
(22, 6),
(23, 5),
(24, 5),
(25, 5),
(26, 5),
(27, 4),
(28, 4),
(29, 4),
(30, 4),
(31, 4),
(32, 4),
(33, 3),
(34, 3),
(35, 3),
(36, 2),
(37, 2),
(38, 2),
(39, 2),
(40, 1),
(41, 1),
(42, 1),
(43, 1),
(44, 1),
(45, 1),
(46, 1),
(47, 1),
(48, 1),
(49, 1),
(50, 1),
(51, 1),
(52, 1),
(53, 1),
(54, 1),
(55, 1),
(56, 1),
(57, 1),
(58, 1),
(59, 1),
(60, 1),
(61, 1),
(62, 1),
(63, 1),
(64, 1),
(65, 1),
(66, 1),
(67, 1),
(68, 1),
(69, 1),
(70, 1),
(71, 1),
(72, 1),
(73, 1),
(24, 3);

-- --------------------------------------------------------

--
-- Table structure for table `notice_board`
--

CREATE TABLE `notice_board` (
  `id` int(11) NOT NULL,
  `faculty_id` int(11) NOT NULL,
  `notice_heading` varchar(50) NOT NULL,
  `notice` text NOT NULL,
  `notice_date` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `notice_board`
--

INSERT INTO `notice_board` (`id`, `faculty_id`, `notice_heading`, `notice`, `notice_date`) VALUES
(1, 1, 'Test 1', 'Something big is coming soon', '2023-04-19'),
(2, 2, 'Test 2', 'Test string 123', '2023-04-19'),
(3, 1, 'Hackathon', 'Some big hackathon is on the way', '2023-04-19'),
(4, 2, 'Event', 'College fest is coming soon', '2023-04-19');

-- --------------------------------------------------------

--
-- Table structure for table `questions_mcq`
--

CREATE TABLE `questions_mcq` (
  `question_id` int(11) NOT NULL,
  `question_title` text DEFAULT NULL,
  `option_set` text DEFAULT NULL,
  `correct_answer` text NOT NULL,
  `points` int(11) DEFAULT NULL,
  `difficulty_level` varchar(10) DEFAULT NULL,
  `time_limit` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `date_created` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `questions_mcq`
--

INSERT INTO `questions_mcq` (`question_id`, `question_title`, `option_set`, `correct_answer`, `points`, `difficulty_level`, `time_limit`, `created_by`, `date_created`) VALUES
(1, 'The concatenation of two lists can be performed in O(1) time. Which of the following variation of the linked list can be used?\\n', 'Singly linked list,Doubly linked list,Circular doubly linked list,Array implementation of list', 'Circular doubly linked list', 1, 'easy', 60, 1, '2023-05-01 21:01:35'),
(6, 'What would be the asymptotic time complexity to add a node at the end of singly linked list, if the pointer is initially pointing to the head of the list?', 'O(1),O(n),θ(n),θ(1)', 'θ(n)', 1, 'medium', 60, 1, '2023-05-01 21:10:40'),
(7, 'What would be the asymptotic time complexity to insert an element at the second position in the linked list?', 'O(1),O(n),O(n2),O(n3)', 'O(1)', 1, 'medium', 60, 1, '2023-05-01 21:10:40'),
(8, 'What is part of a database that holds only one type of information?', 'Report,Field,Record,file', 'Record', 1, 'easy', 60, 2, '2023-05-01 21:12:22'),
(9, '\'OS\' computer abbreviation usually means ?', 'Order of Significance,Open Software,Operating system, Optical Sensor', 'Operating system', 1, 'easy', 60, 2, '2023-05-01 21:12:22'),
(10, '\'.MOV\' extension refers usually to what kind of file?', 'ImageFile,AnimatedFile,AudioFile,MS Office file', 'AudioFile', 1, 'easy', 60, 2, '2023-05-01 21:12:22'),
(11, 'How many bits is a byte?', '4,8,5,6', '8', 1, 'easy', 60, 2, '2023-05-01 21:12:22'),
(12, 'The speed of your net access is defined in terms of..', 'RAM,MHz,Kbps,Megabytes', 'Kbps', 1, 'easy', 60, 2, '2023-05-01 21:12:22'),
(13, 'How many diodes are in a full wave bridge rectifier?', '8,2,3,4', '4', 1, 'easy', 60, 2, '2023-05-01 21:12:22'),
(14, 'Which of these is a search engine?', 'FTP,Google,Archie,ARPANET', 'Google', 1, 'easy', 60, 2, '2023-05-01 21:12:22'),
(15, 'The letters, \"DOS\" stand for...', 'Data Out System,Disk Out System,Disk Operating System,Data Operating System', 'Disk Operating System', 1, 'easy', 60, 2, '2023-05-01 21:12:22'),
(16, 'What does CPU stand for?', 'Cute People United,Commonwealth Press Union,Computer Parts of USA,Central Processing Unit', 'Central Processing Unit', 1, 'easy', 60, 2, '2023-05-01 21:12:22'),
(17, 'Which of these is a valid e-mail address?', 'professor.at.learnthenet,www.learnthenet.com,professor@learnthenet.com,professor@learnthenet', 'professor@learnthenet.com', 1, 'easy', 60, 2, '2023-05-01 21:12:22'),
(18, 'Which of the following special symbol allowed in a variable name?', '* (asterisk),| (pipeline),- (hyphen),_ (underscore)', '_ (underscore)', 1, 'easy', 60, 2, '2023-05-01 21:12:22'),
(19, 'What are the types of linkages?', 'Internal and External,External_Internal and None,External and None,Internal', 'External_Internal and None', 1, 'medium', 60, 2, '2023-05-01 21:12:22'),
(20, 'By default a real number is treated as a', 'float,double,long double,far double', 'double', 1, 'medium', 60, 2, '2023-05-01 21:12:22'),
(21, 'Is the following statement a declaration or definition?\nextern int i;', 'Declaration,Definition,Function,Error', 'Declaration', 1, 'medium', 60, 2, '2023-05-01 21:12:22'),
(22, 'When we mention the prototype of a function?', 'Defining,Declaring,Prototyping,Calling', 'Declaring', 1, 'medium', 60, 1, '2023-05-01 21:12:22'),
(23, 'Which is a reserved word in the Java programming language?', 'method,native,subclasses,reference', 'native', 1, 'easy', 60, 1, '2023-05-01 21:12:22'),
(24, '\nWhich is a valid keyword in java?', 'interface,string,Float,unsigned', 'interface', 1, 'easy', 60, 1, '2023-05-01 21:13:28'),
(25, '\nWhich three are legal array declarations?', 'int [] myScores [],int [6] myScores,Dog myDogs [],All are correct', 'All are correct', 1, 'easy', 60, 1, '2023-05-01 21:13:28'),
(26, 'Which is the valid declarations within an interface definition?', 'public double methoda() ,public final double methoda() ,static void methoda(double d1) ,protected void methoda(double d1)', 'public double methoda(); ', 1, 'easy', 60, 1, '2023-05-01 21:13:28'),
(27, 'Which one is a valid declaration of a boolean?', 'boolean b1 = 0,boolean b2 = \'false\',boolean b3 = false,boolean b4 = Boolean.false();', 'boolean b3 = false;', 1, 'easy', 60, 1, '2023-05-01 21:13:28'),
(28, 'Which is a valid declarations of a String?', 'String s1 = null,String s2 = \'null\',String s3 = (String) \'abc\',String s4 = (String) \'\\ufeed\'', '\nString s1 = null;', 1, 'easy', 60, 1, '2023-05-01 21:13:28'),
(29, 'What will happen if in a C program you assign a value to an array element whose subscript exceeds the size of array?', 'The element will be set to 0,The compiler would report an error,The program may crash if some important data gets overwritten,The array size would appropriately grow.', 'The program may crash if some important data gets overwritten', 1, 'easy', 60, 1, '2023-05-01 21:13:28'),
(30, 'What does the following declaration mean?\nint (*ptr)[10];', 'ptr is array of pointers to 10 integers,ptr is a pointer to an array of 10 integers,ptr is an array of 10 integers,ptr is an pointer to array', 'ptr is a pointer to an array of 10 integers', 1, 'easy', 60, 1, '2023-05-01 21:13:28'),
(31, 'In C, if you pass an array as an argument to a function, what actually gets passed?', 'Value of elements in array,First element of the array,Base address of the array,Address of the last element of array', 'Base address of the array', 1, 'easy', 60, 3, '2023-05-01 21:13:28'),
(32, '\nWhich of the following is not logical operator?', '&,&&,||,!', '&', 1, 'easy', 60, 3, '2023-05-01 21:13:28'),
(33, 'In mathematics and computer programming, which is the correct order of mathematical operators ?', 'Addition->Subtraction->Multiplication->Division,Division->Multiplication->Addition->Subtraction,Multiplication->Addition->Division->Subtraction,Addition->Division->Modulus->Subtraction', 'Division->Multiplication->Addition->Subtraction', 1, 'easy', 60, 3, '2023-05-01 21:13:28'),
(34, 'Which of the following cannot be checked in a switch-case statement?', 'Character,Integer,Float,enum', 'Float', 1, 'easy', 60, 3, '2023-05-01 21:13:28'),
(35, 'A short integer is at least 16 bits wide and a long integer is at least 32 bits wide.', 'True,False', 'True', 1, 'easy', 60, 1, '2023-05-01 21:13:28'),
(36, 'Which type of data can be stored in the database?', 'Image oriented data,Text, files containing data,Data in the form of audio or video, All of the above', 'All of the above', 1, 'medium', 60, 1, '2023-05-01 21:13:28'),
(37, 'Which of the following is not an example of DBMS?', 'MySQL,Microsoft Acess ,IBM DB2,Google', 'Google', 1, 'medium', 60, 1, '2023-05-01 21:13:28'),
(38, 'Which of the following is known as a set of entities of the same type that share same properties, or attributes?', 'Relation set, Tuples, Entity set,Entity Relation model', 'Entity set', 1, 'medium', 60, 1, '2023-05-01 21:13:28'),
(39, 'What is information about data called?', 'Hyper data,Tera data,Meta data,Relations', 'Meta data', 1, 'medium', 60, 1, '2023-05-01 21:13:28'),
(40, 'What does an RDBMS consist of?', 'Collection of Records,Collection of kry,Collection of Tables,Collection of Fields', 'Collection of Tables', 1, 'medium', 60, 1, '2023-05-01 21:13:28'),
(41, 'The DBMS acts as an interface between ________________ and ________________ of an enterprise-class system', 'Data and the DBMS,Application and SQL,Database application and the database,The user and the software', 'Database application and the database', 1, 'medium', 60, 1, '2023-05-01 21:13:28'),
(42, 'In the __________ normal form, a composite attribute is converted to individual attributes.', 'First,Second,Third,Fourth', 'First', 1, 'medium', 60, 1, '2023-05-01 21:13:28'),
(43, 'Tables in second normal form (2NF):', 'Eliminate all hidden dependencies, Eliminate the possibility of a insertion anomalies, Have a composite key, Have all non key fields depend on the whole primary key', 'Eliminate all hidden dependencies', 1, 'medium', 60, 1, '2023-05-01 21:13:28'),
(44, 'Functional Dependencies are the types of constraints that are based on______', 'Key, Key revisited, Superset key, None of the mentioned', 'Key', 1, 'hard', 60, 1, '2023-05-01 21:13:28'),
(45, ' Which forms simplifies and ensures that there are minimal data aggregates and repetitive groups:', '1NF,2NF,3NF, All of the mentioned', '3NF', 1, 'hard', 60, 1, '2023-05-01 21:13:28'),
(46, 'Which level of RAID refers to disk mirroring with block striping?', 'RAID level 1,RAID level 2,RAID level 0,RAID level 3', 'RAID level 1', 1, 'hard', 60, 1, '2023-05-01 21:13:28'),
(47, 'A unit of storage that can store one or more records in a hash file organization is denoted as', 'Buckets,Disk pages,Blocks,Nodes', 'Buckets', 1, 'hard', 60, 1, '2023-05-01 21:13:28'),
(48, 'The file organization which allows us to read records that would satisfy the join condition by using one block read is', 'Heap file organization,Sequential file organization,Clustering file organization,Hash file organization', 'Clustering file organization', 1, 'hard', 60, 1, '2023-05-01 21:13:28'),
(49, 'Each tablespace in an Oracle database consists of one or more files called', 'Files,name space,datafiles,PFILE', 'datafiles', 1, 'hard', 60, 1, '2023-05-01 21:13:28'),
(50, 'The management information system (MIS) structure with one main computer system is called a', 'Hierarchical MIS structure,Distributed MIS structure,Centralized MIS structure,Decentralized MIS structure', 'Centralized MIS structure', 1, 'hard', 60, 1, '2023-05-01 21:13:28'),
(51, 'A top-to-bottom relationship among the items in a database is established by a', 'Hierarchical schema,Network schema,Relational schema,All of the mentioned', 'Hierarchical schema', 1, 'hard', 60, 1, '2023-05-01 21:13:28'),
(52, 'One approach to standardization storing of data?', 'MIS,Structured programming,CODASYL specification,None of the mentioned', 'CODASYL specification', 1, 'hard', 60, 1, '2023-05-01 21:13:28'),
(53, 'he highest level in the hierarchy of data organization is called', 'Data bank,Data base,Data file,Data record', 'Data base', 1, 'hard', 60, 1, '2023-05-01 21:13:28'),
(54, 'How many children does a binary tree have?', '2,any number of children,0 or 1 or 2,0 or 1', '0 or 1 or 2', 1, 'hard', 60, 1, '2023-05-01 21:13:28'),
(55, 'What is/are the disadvantages of implementing tree using normal arrays?', 'difficulty in knowing children nodes of a node,difficult in finding the parent of a node,have to know the maximum number of nodes possible before creation of trees,difficult to implement', 'have to know the maximum number of nodes possible before creation of trees', 1, 'hard', 60, 1, '2023-05-01 21:13:28'),
(56, ' In a max-heap, element with the greatest key is always in the which node?', ' Leaf node,First node of left sub tree,root node,First node of right sub tree', 'root node', 1, 'hard', 60, 1, '2023-05-01 21:13:28'),
(57, 'Heap exhibits the property of a binary tree?', 'True,False', 'True', 1, 'hard', 60, 1, '2023-05-01 21:13:28'),
(58, 'What is the complexity of adding an element to the heap.', 'O(log n),O(h),O(log n) & O(h),O(n)', 'O(log n) & O(h)', 1, 'hard', 60, 1, '2023-05-01 21:13:28'),
(59, 'What is the space complexity of searching in a heap?', 'O(logn),O(n),O(1),O(nlogn)', 'O(n)', 1, 'hard', 60, 1, '2023-05-01 21:13:28'),
(60, ' What is the best case complexity in building a heap?', 'O(nlogn),O(n2),O(n*longn *logn),O(n)', ' O(n)', 1, 'hard', 60, 1, '2023-05-01 21:13:28'),
(61, 'What is the location of a parent node for any arbitary node i?', '(i/2) position,(i+1)/ position,floor(i/2) position,ceil(i/2) position', 'floor(i/2) position', 1, 'hard', 60, 1, '2023-05-01 21:13:28'),
(62, 'Choose the correct properties of weak-heap.', 'Every node has value greater than the value of child node,Every right child of node has greater value than parent node,Every left child of node has greater value than parent node,Every left and right child of node has same value as parent node', 'Every right child of node has greater value than parent node', 1, 'hard', 60, 1, '2023-05-01 21:13:28'),
(63, 'What is the other name of weak heap?', 'Min-heap,Max-heap,Relaxed -heap,Leonardo heap', 'Relaxed -heap', 1, 'hard', 60, 1, '2023-05-01 21:13:28'),
(64, 'What is the space complexity of program to reverse stack recursively?', 'O(1),O(log n),O(n),O(n log n)', 'O(n)', 1, 'hard', 60, 1, '2023-05-01 21:13:28'),
(65, 'Stack can be reversed without using extra space by _____________', 'using recursion,using linked list to implement stack,using an extra stack,it is not possible', 'using linked list to implement stack', 1, 'medium', 60, 1, '2023-05-01 21:13:28'),
(66, 'Which of the following is considered as the top of the stack in the linked list implementation of the stack?', ' Last node,First node,Random node,Middle node', 'First node', 1, 'medium', 60, 1, '2023-05-01 21:13:28'),
(67, 'Which of the following takes O(n) time in worst case in array implementation of stack?', 'pop,push,isEmpty,pop, push and isEmpty takes constant time', 'pop, push and isEmpty takes constant time', 1, 'medium', 60, 1, '2023-05-01 21:13:28'),
(68, 'Which of the following sorting algorithm has best case time complexity of O(n2)?', 'bubble sort,selection sort,insertion sort,stupid sort', 'selection sort', 1, 'medium', 60, 1, '2023-05-01 21:13:28'),
(69, 'Which of the following is the biggest advantage of selection sort?', 'its has low time complexity,it has low space complexity,it is easy to implement,it requires only n swaps under any condition', 'it requires only n swaps under any condition', 1, 'medium', 60, 1, '2023-05-01 21:13:28'),
(70, 'Which of the following methods can be used to find the largest and smallest number in a linked list?', 'Recursion,Iteration,Both Recursion and iteration,Impossible to find the largest and smallest numbers', 'Both Recursion and iteration', 1, 'medium', 60, 1, '2023-05-01 21:13:28'),
(71, 'The data structure required for Breadth First Traversal on a graph is?', 'Stack,Array,Queue,Tree', 'Queue', 1, 'medium', 60, 1, '2023-05-01 21:13:28'),
(72, 'A linear collection of data elements where the linear node is given by means of pointer is called?', ' Linked list,node list,Primitive list,Unordered list', 'Linked list', 1, 'medium', 60, 1, '2023-05-01 21:13:28'),
(73, ' In linked list each node contains a minimum of two fields. One field is data field to store the data second field is?', 'Pointer to character,Pointer to integer,Pointer to node,Node', 'Pointer to node', 1, 'medium', 60, 1, '2023-05-01 21:13:28');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `usn` varchar(25) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `branch` int(11) DEFAULT NULL,
  `semester` int(11) DEFAULT NULL,
  `password` text DEFAULT NULL,
  `tests_attended` int(11) NOT NULL DEFAULT 0,
  `total_score` int(11) NOT NULL DEFAULT 0,
  `tests_missed` int(11) NOT NULL DEFAULT 0,
  `verified` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`usn`, `name`, `email`, `branch`, `semester`, `password`, `tests_attended`, `total_score`, `tests_missed`, `verified`) VALUES
('4CB19CS064', 'Padmaprasad', 'padmaprasad@gmail.com', 2, 8, '$2a$10$wuO41k5NIWvFRWzfE3Mif.dGugIsvgjoYhenqoY0A7.rdVgWun0J.', 0, 0, 0, 1),
('4CB19CS076', 'Paramashiva', 'pvparamashivakaranth@gmail.com', 2, 8, '$2a$10$16Ol0.W9/JKYCm4uFIX/se/lJXFr/qGABDSj/LmkzE2kt2JxF9Dhe', 0, 0, 0, 1),
('4CB19CS089', 'Sandesh', 'sandeshhd16@gmail.com', 2, 8, '$2a$10$FZmhxN6SzJ0Y72nJGeEOcO7g6UZak/L2h9Ta2M4JtPmvpUM9fql1m', 41, 118, 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `student_topic_score`
--

CREATE TABLE `student_topic_score` (
  `user_id` varchar(25) NOT NULL,
  `topic_id` int(11) NOT NULL,
  `score` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `student_topic_score`
--

INSERT INTO `student_topic_score` (`user_id`, `topic_id`, `score`) VALUES
('4CB19CS089', 1, 14),
('4CB19CS089', 3, 11),
('4CB19CS089', 5, 12);

-- --------------------------------------------------------

--
-- Table structure for table `tests`
--

CREATE TABLE `tests` (
  `id` int(11) NOT NULL,
  `test_name` varchar(50) NOT NULL,
  `faculty_id` int(11) NOT NULL,
  `sections` int(11) NOT NULL,
  `duration` int(11) NOT NULL,
  `questions` int(11) NOT NULL DEFAULT 0,
  `marks` int(11) NOT NULL DEFAULT 0,
  `deadline` datetime NOT NULL DEFAULT current_timestamp(),
  `instructions` text NOT NULL,
  `status` text NOT NULL DEFAULT 'disabled'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tests`
--

INSERT INTO `tests` (`id`, `test_name`, `faculty_id`, `sections`, `duration`, `questions`, `marks`, `deadline`, `instructions`, `status`) VALUES
(3, '2nd internal', 1, 0, 240, 4, 4, '2023-05-02 23:43:43', '', 'disabled'),
(13, 'Test x', 1, 0, 240, 4, 4, '2023-05-18 13:26:33', '', 'enabled'),
(15, 'testing-test', 1, 0, 120, 2, 2, '2023-05-15 07:05:29', '', 'enabled');

-- --------------------------------------------------------

--
-- Table structure for table `tests_branch`
--

CREATE TABLE `tests_branch` (
  `test_id` int(11) NOT NULL,
  `branch_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tests_branch`
--

INSERT INTO `tests_branch` (`test_id`, `branch_id`) VALUES
(3, 2),
(13, 5),
(15, 3);

-- --------------------------------------------------------

--
-- Table structure for table `test_questions`
--

CREATE TABLE `test_questions` (
  `test_id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `test_questions`
--

INSERT INTO `test_questions` (`test_id`, `question_id`) VALUES
(3, 71),
(3, 73),
(3, 26),
(3, 27),
(13, 24),
(13, 25),
(13, 26),
(13, 27),
(15, 24),
(15, 41);

--
-- Triggers `test_questions`
--
DELIMITER $$
CREATE TRIGGER `marksTrigger` AFTER INSERT ON `test_questions` FOR EACH ROW UPDATE `tests` set marks = marks + (SELECT points FROM `questions_mcq` where question_id = new.question_id) WHERE id = new.test_id
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `questionsTrigger` AFTER INSERT ON `test_questions` FOR EACH ROW UPDATE `tests` set questions = questions + 1 WHERE id = new.test_id
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `timeTrigger` AFTER INSERT ON `test_questions` FOR EACH ROW UPDATE `tests` set duration = duration + (SELECT time_limit FROM `questions_mcq` where question_id = new.question_id) WHERE id = new.test_id
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `topics`
--

CREATE TABLE `topics` (
  `topic_id` int(11) NOT NULL,
  `topic_name` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `topics`
--

INSERT INTO `topics` (`topic_id`, `topic_name`) VALUES
(1, 'Datastructure and Algorithms'),
(2, 'Operators'),
(3, 'Array'),
(4, 'Java'),
(5, 'C Programming'),
(6, 'General');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_user`
--
ALTER TABLE `admin_user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `attended_test`
--
ALTER TABLE `attended_test`
  ADD PRIMARY KEY (`id`),
  ADD KEY `attended_test_constraint` (`test_id`),
  ADD KEY `test_user_constraint` (`user_id`);

--
-- Indexes for table `branches`
--
ALTER TABLE `branches`
  ADD PRIMARY KEY (`branch_id`);

--
-- Indexes for table `faculty`
--
ALTER TABLE `faculty`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `branch` (`branch`);

--
-- Indexes for table `mcq_topic`
--
ALTER TABLE `mcq_topic`
  ADD KEY `topic_mcq_key` (`topic_id`),
  ADD KEY `mcq_key` (`q_id`);

--
-- Indexes for table `notice_board`
--
ALTER TABLE `notice_board`
  ADD PRIMARY KEY (`id`),
  ADD KEY `notice_faculty` (`faculty_id`);

--
-- Indexes for table `questions_mcq`
--
ALTER TABLE `questions_mcq`
  ADD PRIMARY KEY (`question_id`),
  ADD KEY `faculty_foreign_key` (`created_by`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`usn`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `branch` (`branch`);

--
-- Indexes for table `student_topic_score`
--
ALTER TABLE `student_topic_score`
  ADD PRIMARY KEY (`user_id`,`topic_id`),
  ADD KEY `topic_id` (`topic_id`);

--
-- Indexes for table `tests`
--
ALTER TABLE `tests`
  ADD PRIMARY KEY (`id`),
  ADD KEY `faculty_key` (`faculty_id`);

--
-- Indexes for table `tests_branch`
--
ALTER TABLE `tests_branch`
  ADD PRIMARY KEY (`test_id`,`branch_id`),
  ADD KEY `branch_id` (`branch_id`);

--
-- Indexes for table `test_questions`
--
ALTER TABLE `test_questions`
  ADD KEY `q_test_id` (`test_id`),
  ADD KEY `q_qid` (`question_id`);

--
-- Indexes for table `topics`
--
ALTER TABLE `topics`
  ADD PRIMARY KEY (`topic_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_user`
--
ALTER TABLE `admin_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `attended_test`
--
ALTER TABLE `attended_test`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `branches`
--
ALTER TABLE `branches`
  MODIFY `branch_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `faculty`
--
ALTER TABLE `faculty`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `notice_board`
--
ALTER TABLE `notice_board`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `questions_mcq`
--
ALTER TABLE `questions_mcq`
  MODIFY `question_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- AUTO_INCREMENT for table `tests`
--
ALTER TABLE `tests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `topics`
--
ALTER TABLE `topics`
  MODIFY `topic_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `attended_test`
--
ALTER TABLE `attended_test`
  ADD CONSTRAINT `attended_test_constraint` FOREIGN KEY (`test_id`) REFERENCES `tests` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `test_user_constraint` FOREIGN KEY (`user_id`) REFERENCES `students` (`usn`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `faculty`
--
ALTER TABLE `faculty`
  ADD CONSTRAINT `faculty_ibfk_1` FOREIGN KEY (`branch`) REFERENCES `branches` (`branch_id`) ON DELETE CASCADE;

--
-- Constraints for table `mcq_topic`
--
ALTER TABLE `mcq_topic`
  ADD CONSTRAINT `mcq_key` FOREIGN KEY (`q_id`) REFERENCES `questions_mcq` (`question_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `topic_mcq_key` FOREIGN KEY (`topic_id`) REFERENCES `topics` (`topic_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `notice_board`
--
ALTER TABLE `notice_board`
  ADD CONSTRAINT `notice_faculty` FOREIGN KEY (`faculty_id`) REFERENCES `faculty` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `questions_mcq`
--
ALTER TABLE `questions_mcq`
  ADD CONSTRAINT `faculty_foreign_key` FOREIGN KEY (`created_by`) REFERENCES `faculty` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `students`
--
ALTER TABLE `students`
  ADD CONSTRAINT `students_ibfk_1` FOREIGN KEY (`branch`) REFERENCES `branches` (`branch_id`) ON DELETE CASCADE;

--
-- Constraints for table `student_topic_score`
--
ALTER TABLE `student_topic_score`
  ADD CONSTRAINT `student_topic_score_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `students` (`usn`) ON DELETE CASCADE,
  ADD CONSTRAINT `student_topic_score_ibfk_2` FOREIGN KEY (`topic_id`) REFERENCES `topics` (`topic_id`) ON DELETE CASCADE;

--
-- Constraints for table `tests`
--
ALTER TABLE `tests`
  ADD CONSTRAINT `faculty_key` FOREIGN KEY (`faculty_id`) REFERENCES `faculty` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tests_branch`
--
ALTER TABLE `tests_branch`
  ADD CONSTRAINT `tests_branch_ibfk_1` FOREIGN KEY (`test_id`) REFERENCES `tests` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `tests_branch_ibfk_2` FOREIGN KEY (`branch_id`) REFERENCES `branches` (`branch_id`) ON DELETE CASCADE;

--
-- Constraints for table `test_questions`
--
ALTER TABLE `test_questions`
  ADD CONSTRAINT `q_qid` FOREIGN KEY (`question_id`) REFERENCES `questions_mcq` (`question_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `q_test_id` FOREIGN KEY (`test_id`) REFERENCES `tests` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
