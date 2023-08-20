import mongoose from 'mongoose';

const ImageSchema = new mongoose.Schema(
  {
    imges: [
      {
        name: String,
        data: Buffer,
        contentType: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const ImageModel = mongoose.model('Images', ImageSchema);

