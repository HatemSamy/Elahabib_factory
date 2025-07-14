import mongoose from 'mongoose';

const requestFormSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String , required: true },
  city: { type: String , required: true },
  currentBusiness: { type: String },
  message: { type: String },
  hasWebsite: { type: Boolean,required: true  },
  haveExperience: {   
    type: Boolean,
    required: true,  
  }
  

  
}, {
  timestamps: true,
});

const RequestFormModel = mongoose.model('RequestForm', requestFormSchema);
export default RequestFormModel;
