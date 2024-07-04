import Nat "mo:base/Nat";
import Nat32 "mo:base/Nat32";
import Time "mo:base/Time";
import Text "mo:base/Text";
import Blob "mo:base/Blob";
import Array "mo:base/Array";
import Principal "mo:base/Principal";

actor HelconBackend {
  public shared query (msg) func whoami() : async Principal {
    msg.caller;
  };
  public query func greetAuthenticated(user : Principal) : async Text {
    return "Hello, " # Principal.toText(user) # "!";
  };
  // Define the Result type
  public type Result<T, E> = {
    #ok : T;
    #err : E;
  };

  // Define user roles
  public type UserRole = { #Patient; #Doctor; #Admin };

  // Define user structure
  public type UserId = Nat;
  public type User = {
    id : UserId;
    username : Text;
    role : UserRole;
    name : ?Text;
    email : ?Text;
    licenseNumber : ?Text;
    dateOfBirth : ?Text;
    gender : ?Text;
    image : ?Blob;
    verified : Bool;
  };

  // Define appointment structure
  public type Appointment = {
    id : Nat;
    doctorUsername : Text;
    patientUsername : Text;
    condition : Text;
    attachment : ?Blob;
    timestamp : Int;
  };

  // Define message structure
  public type Message = {
    id : Nat;
    fromUsername : Text;
    toUsername : Text;
    content : Text;
    media : ?Blob;
    emoji : ?Text;
    timestamp : Int;
  };

  // Define report structure
  public type Report = {
    id : Nat;
    doctorUsername : Text;
    patientUsername : Text;
    content : Text;
    media : ?Blob;
    timestamp : Int;
    principalId : UserId;
  };

  // Initialize empty arrays for storing data
  stable var users : [User] = [];
  stable var appointments : [Appointment] = [];
  stable var messages : [Message] = [];
  stable var reports : [Report] = [];

  stable var nextUserId : UserId = 0;
  stable var nextAppointmentId : Nat = 0;
  stable var nextMessageId : Nat = 0;
  stable var nextReportId : Nat = 0;

  // Function to add a user
  public func addUser(username : Text, role : UserRole, name : ?Text, email : ?Text, licenseNumber : ?Text, dateOfBirth : ?Text, gender : ?Text, image : ?Blob) : async Result<UserId, Text> {
    if (Array.find<User>(users, func(user : User) : Bool { user.username == username }) != null) {
      return #err("Username already exists.");
    } else {
      let userId = nextUserId;
      users := Array.append<User>(users, [{ id = userId; username = username; role = role; name = name; email = email; licenseNumber = licenseNumber; dateOfBirth = dateOfBirth; gender = gender; image = image; verified = false }]);
      nextUserId += 1;
      return #ok(userId);
    };
  };

  // Function to verify a doctor
  public func verifyDoctor(username : Text) : async Bool {
    var updated = false;
    users := Array.map<User, User>(
      users,
      func(user : User) : User {
        if (user.username == username and user.role == #Doctor) {
          updated := true;
          {
            id = user.id;
            username = user.username;
            role = user.role;
            name = user.name;
            email = user.email;
            licenseNumber = user.licenseNumber;
            dateOfBirth = user.dateOfBirth;
            gender = user.gender;
            image = user.image;
            verified = true;
          };
        } else {
          user;
        };
      },
    );
    return updated;
  };

  // Function to query all verified doctors
  public query func getVerifiedDoctors() : async [User] {
    Array.filter<User>(
      users,
      func(user : User) : Bool {
        user.role == #Doctor and user.verified;
      },
    );
  };

  // Function to register a patient
  public func registerPatient(username : Text) : async Result<UserId, Text> {
    if (Array.find<User>(users, func(user : User) : Bool { user.username == username }) != null) {
      return #err("Username already exists.");
    } else {
      let userId = nextUserId;
      users := Array.append<User>(users, [{ id = userId; username = username; role = #Patient; name = null; email = null; licenseNumber = null; dateOfBirth = null; gender = null; image = null; verified = false }]);
      nextUserId += 1;
      return #ok(userId);
    };
  };

  // Function to optionally add an image for a patient
  public func addPatientImage(username : Text, image : Blob) : async Bool {
    var updated = false;
    users := Array.map<User, User>(
      users,
      func(user : User) : User {
        if (user.username == username and user.role == #Patient) {
          updated := true;
          {
            id = user.id;
            username = user.username;
            role = user.role;
            name = user.name;
            email = user.email;
            licenseNumber = user.licenseNumber;
            dateOfBirth = user.dateOfBirth;
            gender = user.gender;
            image = user.image;
            verified = user.verified;
          };
        } else {
          user;
        };
      },
    );
    return updated;
  };

  // Function to create an appointment
  public func createAppointment(patientUsername : Text, doctorUsername : Text, condition : Text, attachment : ?Blob) : async Result<Nat, Text> {
    if (Array.find<User>(users, func(user : User) : Bool { user.username == doctorUsername and user.role == #Doctor }) != null) {
      let appointmentId = nextAppointmentId;
      appointments := Array.append<Appointment>(appointments, [{ id = appointmentId; doctorUsername = doctorUsername; patientUsername = patientUsername; condition = condition; attachment = attachment; timestamp = Time.now() }]);
      nextAppointmentId += 1;
      return #ok(appointmentId);
    } else {
      return #err("Doctor username does not exist.");
    };
  };

  // Function to query available appointments for a doctor
  public query func getAppointments(doctorUsername : Text) : async [Appointment] {
    Array.filter<Appointment>(
      appointments,
      func(a : Appointment) : Bool {
        a.doctorUsername == doctorUsername;
      },
    );
  };

  // Function to send a message
  public func sendMessage(fromUsername : Text, toUsername : Text, content : Text, media : ?Blob, emoji : ?Text) : async Result<Nat, Text> {
    if (Array.find<User>(users, func(user : User) : Bool { user.username == toUsername }) != null) {
      let messageId = nextMessageId;
      messages := Array.append<Message>(messages, [{ id = messageId; fromUsername = fromUsername; toUsername = toUsername; content = content; media = media; emoji = emoji; timestamp = Time.now() }]);
      nextMessageId += 1;
      return #ok(messageId);
    } else {
      return #err("Recipient username does not exist.");
    };
  };

  // Function to create a report
  public func createReport(doctorUsername : Text, patientUsername : Text, content : Text, media : ?Blob) : async Result<Nat, Text> {
    if (Array.find<User>(users, func(user : User) : Bool { user.username == patientUsername and user.role == #Patient }) != null) {
      let reportId = nextReportId;
      reports := Array.append<Report>(reports, [{ id = reportId; doctorUsername = doctorUsername; patientUsername = patientUsername; content = content; media = media; timestamp = Time.now(); principalId = nextUserId }]);
      nextReportId += 1;
      return #ok(reportId);
    } else {
      return #err("Patient username does not exist.");
    };
  };

  // Function to query report details
  public query func getReport(patientUsername : Text, reportId : Nat) : async ?Report {
    Array.find<Report>(
      reports,
      func(r : Report) : Bool {
        r.patientUsername == patientUsername and r.id == reportId;
      },
    );
  };
};
