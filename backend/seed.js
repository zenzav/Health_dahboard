const mongoose = require('mongoose');
require('dotenv').config();

const Department = require('./models/Department');
const Staff = require('./models/Staff');
const Doctor = require('./models/Doctor');
const Patient = require('./models/Patient');
const Equipment = require('./models/Equipment');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/health_management';

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Promise.all([
      Department.deleteMany({}),
      Staff.deleteMany({}),
      Doctor.deleteMany({}),
      Patient.deleteMany({}),
      Equipment.deleteMany({}),
    ]);
    console.log('🗑️  Cleared existing data');

    // Seed Departments
    const departments = await Department.insertMany([
      { name: 'Cardiology', description: 'Heart and cardiovascular diseases' },
      { name: 'Neurology', description: 'Brain and nervous system disorders' },
      { name: 'Orthopedics', description: 'Bone, joint, and muscle conditions' },
      { name: 'Pediatrics', description: 'Medical care for children and infants' },
      { name: 'Emergency', description: 'Urgent and emergency medical care' },
      { name: 'Radiology', description: 'Medical imaging and diagnostics' },
    ]);
    console.log(`✅ Seeded ${departments.length} departments`);

    // Seed Doctors
    const doctors = await Doctor.insertMany([
      { name: 'Dr. Sarah Johnson', specialization: 'Cardiologist', phone: '555-0101', departmentId: departments[0]._id, status: 'Active' },
      { name: 'Dr. Michael Chen', specialization: 'Neurologist', phone: '555-0102', departmentId: departments[1]._id, status: 'Active' },
      { name: 'Dr. Emily Williams', specialization: 'Orthopedic Surgeon', phone: '555-0103', departmentId: departments[2]._id, status: 'Active' },
      { name: 'Dr. James Patel', specialization: 'Pediatrician', phone: '555-0104', departmentId: departments[3]._id, status: 'Active' },
      { name: 'Dr. Olivia Brown', specialization: 'Emergency Medicine', phone: '555-0105', departmentId: departments[4]._id, status: 'Active' },
      { name: 'Dr. Robert Davis', specialization: 'Radiologist', phone: '555-0106', departmentId: departments[5]._id, status: 'Inactive' },
      { name: 'Dr. Laura Martinez', specialization: 'Cardiologist', phone: '555-0107', departmentId: departments[0]._id, status: 'Active' },
      { name: 'Dr. Kevin Wilson', specialization: 'Neurologist', phone: '555-0108', departmentId: departments[1]._id, status: 'Inactive' },
    ]);
    console.log(`✅ Seeded ${doctors.length} doctors`);

    // Seed Staff
    const staff = await Staff.insertMany([
      { name: 'Alice Thompson', email: 'alice.t@hospital.com', phone: '555-0201', departmentId: departments[0]._id, role: 'Nurse', status: 'Active' },
      { name: 'Bob Miller', email: 'bob.m@hospital.com', phone: '555-0202', departmentId: departments[1]._id, role: 'Lab Technician', status: 'Active' },
      { name: 'Carol White', email: 'carol.w@hospital.com', phone: '555-0203', departmentId: departments[2]._id, role: 'Physiotherapist', status: 'Active' },
      { name: 'David Lee', email: 'david.l@hospital.com', phone: '555-0204', departmentId: departments[3]._id, role: 'Nurse', status: 'Active' },
      { name: 'Emma Garcia', email: 'emma.g@hospital.com', phone: '555-0205', departmentId: departments[4]._id, role: 'Paramedic', status: 'Active' },
      { name: 'Frank Harris', email: 'frank.h@hospital.com', phone: '555-0206', departmentId: departments[5]._id, role: 'Radiographer', status: 'Inactive' },
      { name: 'Grace Lewis', email: 'grace.l@hospital.com', phone: '555-0207', departmentId: departments[0]._id, role: 'Receptionist', status: 'Active' },
      { name: 'Henry Clark', email: 'henry.c@hospital.com', phone: '555-0208', departmentId: departments[1]._id, role: 'Nurse', status: 'Active' },
      { name: 'Isabella Robinson', email: 'isabella.r@hospital.com', phone: '555-0209', departmentId: departments[4]._id, role: 'Paramedic', status: 'Active' },
      { name: 'Jack Young', email: 'jack.y@hospital.com', phone: '555-0210', departmentId: departments[2]._id, role: 'Lab Technician', status: 'Active' },
    ]);
    console.log(`✅ Seeded ${staff.length} staff members`);

    // Seed Patients
    const patients = await Patient.insertMany([
      { name: 'William Anderson', age: 52, gender: 'Male', contact: '555-1001', admissionDate: new Date('2024-01-10'), medicineDetails: 'Aspirin 75mg, Atorvastatin 20mg' },
      { name: 'Sophia Taylor', age: 34, gender: 'Female', contact: '555-1002', admissionDate: new Date('2024-01-15'), medicineDetails: 'Ibuprofen 400mg, Amoxicillin 500mg' },
      { name: 'Liam Jackson', age: 7, gender: 'Male', contact: '555-1003', admissionDate: new Date('2024-01-20'), medicineDetails: 'Paracetamol syrup 120mg/5ml' },
      { name: 'Mia Thomas', age: 67, gender: 'Female', contact: '555-1004', admissionDate: new Date('2024-02-01'), medicineDetails: 'Metformin 500mg, Lisinopril 10mg' },
      { name: 'Noah White', age: 45, gender: 'Male', contact: '555-1005', admissionDate: new Date('2024-02-10'), medicineDetails: 'Omeprazole 20mg, Pantoprazole 40mg' },
      { name: 'Ava Harris', age: 28, gender: 'Female', contact: '555-1006', admissionDate: new Date('2024-02-18'), medicineDetails: 'Cetirizine 10mg, Salbutamol inhaler' },
      { name: 'Oliver Martin', age: 61, gender: 'Male', contact: '555-1007', admissionDate: new Date('2024-03-05'), medicineDetails: 'Warfarin 5mg, Digoxin 0.125mg' },
      { name: 'Isabella Garcia', age: 19, gender: 'Female', contact: '555-1008', admissionDate: new Date('2024-03-12'), medicineDetails: 'Doxycycline 100mg, Probiotic' },
      { name: 'Elijah Martinez', age: 73, gender: 'Male', contact: '555-1009', admissionDate: new Date('2024-03-20'), medicineDetails: 'Amlodipine 5mg, Furosemide 40mg' },
      { name: 'Charlotte Robinson', age: 41, gender: 'Female', contact: '555-1010', admissionDate: new Date('2024-04-01'), medicineDetails: 'Sertraline 50mg, Clonazepam 0.5mg' },
      { name: 'James Clark', age: 55, gender: 'Male', contact: '555-1011', admissionDate: new Date('2024-04-08'), medicineDetails: 'Metoprolol 25mg, Atenolol 50mg' },
      { name: 'Amelia Rodriguez', age: 31, gender: 'Female', contact: '555-1012', admissionDate: new Date('2024-04-10'), medicineDetails: 'Levothyroxine 50mcg' },
    ]);
    console.log(`✅ Seeded ${patients.length} patients`);

    // Seed Equipment
    const equipments = await Equipment.insertMany([
      { name: 'ECG Machine', type: 'Diagnostic', departmentId: departments[0]._id, status: 'In Use', purchaseDate: new Date('2022-03-15') },
      { name: 'MRI Scanner', type: 'Imaging', departmentId: departments[5]._id, status: 'Available', purchaseDate: new Date('2021-06-20') },
      { name: 'Ventilator', type: 'Life Support', departmentId: departments[4]._id, status: 'In Use', purchaseDate: new Date('2023-01-10') },
      { name: 'X-Ray Machine', type: 'Imaging', departmentId: departments[5]._id, status: 'Available', purchaseDate: new Date('2020-09-05') },
      { name: 'Ultrasound Machine', type: 'Diagnostic', departmentId: departments[0]._id, status: 'In Use', purchaseDate: new Date('2022-11-12') },
      { name: 'Defibrillator', type: 'Emergency', departmentId: departments[4]._id, status: 'Available', purchaseDate: new Date('2023-04-18') },
      { name: 'Blood Glucose Monitor', type: 'Monitoring', departmentId: departments[3]._id, status: 'Available', purchaseDate: new Date('2023-07-22') },
      { name: 'Infusion Pump', type: 'Treatment', departmentId: departments[1]._id, status: 'In Use', purchaseDate: new Date('2022-05-30') },
      { name: 'Surgical Microscope', type: 'Surgical', departmentId: departments[2]._id, status: 'Maintenance', purchaseDate: new Date('2019-12-01') },
      { name: 'Patient Monitor', type: 'Monitoring', departmentId: departments[4]._id, status: 'In Use', purchaseDate: new Date('2023-02-14') },
    ]);
    console.log(`✅ Seeded ${equipments.length} equipment items`);

    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`   Departments : ${departments.length}`);
    console.log(`   Doctors     : ${doctors.length}`);
    console.log(`   Staff       : ${staff.length}`);
    console.log(`   Patients    : ${patients.length}`);
    console.log(`   Equipment   : ${equipments.length}`);
    console.log('\n🔐 Login Credentials:');
    console.log('   Username: admin');
    console.log('   Password: admin123');
  } catch (err) {
    console.error('❌ Seed error:', err.message);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from MongoDB');
    process.exit(0);
  }
}

seed();
