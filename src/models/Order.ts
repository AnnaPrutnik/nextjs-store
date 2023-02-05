import { models, model, Schema, SchemaTypes } from 'mongoose';

const OrderSchema: Schema = new Schema(
  {
    orderItems: [
      {
        slug: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    shipping: {
      fullName: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      postalCode: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
    },
    payment: {
      type: String,
      required: true,
    },
    itemsPrice: {
      type: Number,
      required: true,
    },
    shippingPrice: {
      type: Number,
      required: true,
    },
    taxPrice: {
      type: Number,
      require: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    user_id: {
      type: SchemaTypes.ObjectId,
      ref: 'UserModel',
      require: true,
    },
    isPaid: { type: Boolean, default: false },
    isDelivered: { type: Boolean, default: false },
    paidAt: { type: Date },
    deliveredAt: { type: Date },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
  }
);

export const OrderModel = models.Order || model('Order', OrderSchema);
