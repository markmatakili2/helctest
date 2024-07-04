export const idlFactory = ({ IDL }) => {
  const UserRole = IDL.Variant({
    'Doctor' : IDL.Null,
    'Admin' : IDL.Null,
    'Patient' : IDL.Null,
  });
  const UserId = IDL.Nat;
  const Result_1 = IDL.Variant({ 'ok' : UserId, 'err' : IDL.Text });
  const Result = IDL.Variant({ 'ok' : IDL.Nat, 'err' : IDL.Text });
  const Appointment = IDL.Record({
    'id' : IDL.Nat,
    'doctorUsername' : IDL.Text,
    'patientUsername' : IDL.Text,
    'timestamp' : IDL.Int,
    'attachment' : IDL.Opt(IDL.Vec(IDL.Nat8)),
    'condition' : IDL.Text,
  });
  const Report = IDL.Record({
    'id' : IDL.Nat,
    'media' : IDL.Opt(IDL.Vec(IDL.Nat8)),
    'content' : IDL.Text,
    'doctorUsername' : IDL.Text,
    'patientUsername' : IDL.Text,
    'timestamp' : IDL.Int,
    'principalId' : UserId,
  });
  const User = IDL.Record({
    'id' : UserId,
    'verified' : IDL.Bool,
    'username' : IDL.Text,
    'dateOfBirth' : IDL.Opt(IDL.Text),
    'name' : IDL.Opt(IDL.Text),
    'role' : UserRole,
    'email' : IDL.Opt(IDL.Text),
    'gender' : IDL.Opt(IDL.Text),
    'licenseNumber' : IDL.Opt(IDL.Text),
    'image' : IDL.Opt(IDL.Vec(IDL.Nat8)),
  });
  return IDL.Service({
    'addPatientImage' : IDL.Func([IDL.Text, IDL.Vec(IDL.Nat8)], [IDL.Bool], []),
    'addUser' : IDL.Func(
        [
          IDL.Text,
          UserRole,
          IDL.Opt(IDL.Text),
          IDL.Opt(IDL.Text),
          IDL.Opt(IDL.Text),
          IDL.Opt(IDL.Text),
          IDL.Opt(IDL.Text),
          IDL.Opt(IDL.Vec(IDL.Nat8)),
        ],
        [Result_1],
        [],
      ),
    'createAppointment' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Opt(IDL.Vec(IDL.Nat8))],
        [Result],
        [],
      ),
    'createReport' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Opt(IDL.Vec(IDL.Nat8))],
        [Result],
        [],
      ),
    'getAppointments' : IDL.Func([IDL.Text], [IDL.Vec(Appointment)], ['query']),
    'getReport' : IDL.Func([IDL.Text, IDL.Nat], [IDL.Opt(Report)], ['query']),
    'getVerifiedDoctors' : IDL.Func([], [IDL.Vec(User)], ['query']),
    'greetAuthenticated' : IDL.Func([IDL.Principal], [IDL.Text], ['query']),
    'registerPatient' : IDL.Func([IDL.Text], [Result_1], []),
    'sendMessage' : IDL.Func(
        [
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Opt(IDL.Vec(IDL.Nat8)),
          IDL.Opt(IDL.Text),
        ],
        [Result],
        [],
      ),
    'verifyDoctor' : IDL.Func([IDL.Text], [IDL.Bool], []),
    'whoami' : IDL.Func([], [IDL.Principal], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
