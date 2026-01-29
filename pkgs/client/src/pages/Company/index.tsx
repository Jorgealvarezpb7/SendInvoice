import { useState } from "react";

import { ImageInput } from "../../components/atoms/ImageInput";
import { Input } from "../../components/atoms/Input";
import AddressForm from "../../components/molecules/AddressForm";
import { SendInvoiceClient } from "../../services/SendInvoice";
import { useToken, useUser } from "../../hooks/user";

import type { AddressFormFields } from "../../components/molecules/AddressForm";

import "./Company.css";

const initialFormState = {
  name: "",
  phone: "",
  logoId: "",
  signatureId: "",
  address: {
    streetAddress1: "",
    streetAddress2: "",
    city: "",
    cityArea: "",
    postalCode: "",
    country: "",
  },
};

export default function Company() {
  const token = useToken();
  const user = useUser();
  const [form, setForm] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [formKey, setFormKey] = useState(0);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const sendInvoiceClient = new SendInvoiceClient(
        new URL("http://127.0.0.1:8080"),
      );

      const { id: addressId } = await sendInvoiceClient.address.createAddress(form.address);

      await sendInvoiceClient.company.createCompany(token as string, {
        name: form.name,
        phone: form.phone,
        logoId: form.logoId,
        userId: user?.id as string,
        signatureId: form.signatureId,
        addressId: addressId,
      });

      alert('Company created successfully!');
      setForm(initialFormState);
      setFormKey(prev => prev + 1);

    } catch (error) {
      console.error('Error creating company:', error);
      alert('Error creating company. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  const handleFileChosen = async (name: string, file: File) => {
    const sendInvoiceClient = new SendInvoiceClient(
      new URL("http://127.0.0.1:8080"),
    );
    const { id: imageId } = await sendInvoiceClient.image.uploadImage(
      token as string,
      file,
    );

    setForm((prevForm) => ({
      ...prevForm,
      [name]: imageId,
    }));
  };

  const handleAddressChange = (address: AddressFormFields) => {
    setForm((prevForm) => ({
      ...prevForm,
      address,
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  return (
    <div className="company-layout">
      <h1>Create Sender</h1>

      <div className="company-form-container">
        <div className="company-form-section">
          <h2>Basic Information</h2>

          <div className="company-input-group">
            <label htmlFor="name">Sender Name</label>
            <Input
              type="text"
              name="name"
              value={form.name}
              onChange={handleInputChange}
              placeholder="Enter company name"
            />
          </div>

          <div className="company-input-group">
            <label htmlFor="phone">Phone Number</label>
            <Input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleInputChange}
              placeholder="Enter phone number"
            />
          </div>
        </div>

        <div className="company-form-section">
          <h2>Sender Address</h2>
          <div className="company-address-section">
            <AddressForm
              key={`address-${formKey}`}   
              onChange={handleAddressChange} />
          </div>
        </div>

        <div className="company-form-section">
          <h2>Images & Branding</h2>
          <div className="company-images-section">
            <ImageInput
              key={`logo-${formKey}`} 
              name="logoId"
              label="Company Logo"
              onFileChosen={handleFileChosen}
            />
            <ImageInput
              key={`signature-${formKey}`} 
              name="signatureId"
              label="Signature"
              onFileChosen={handleFileChosen}
            />
          </div>
        </div>

        <div className="company-submit-container">
          <button
            type="button"
            className="company-cancel-button"
            onClick={() => window.history.back()}
            disabled={loading} 
          >
            Cancel
          </button>
          <button
            type="button"
            className="company-submit-button"
            onClick={handleSubmit}
            disabled={loading} 
          >
            {loading ? 'Creating...' : 'Create Sender'} 
          </button>
        </div>
      </div>
    </div>
  );
}