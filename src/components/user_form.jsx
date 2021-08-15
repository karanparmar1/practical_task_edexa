import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import InputBox from './input_box';
import {
  GetUesrById,
  InsertUser,
  UpdateUser,
  ValidEmail,
  ValidImage,
  ValidPassword,
  ValidUserName,
} from '../utils/helper';

const UserForm = ({ title, className, ...props }) => {
  const [user, setUser] = useState({ name: '', email: '', password: '', image: '', address: '' });
  const [errors, setErrors] = useState({ image: false, name: false, address: false, bday: false });
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (id) {
      const obj = GetUesrById(id);
      if (obj) setUser(obj);
      else {
        setErrors((state) => ({ ...state, page: "User doesn't exist" }));
      }
    }
  }, [id]);

  useEffect(() => {
    // If already error - start checking on typing
    if (errors.name || errors.password || errors.email || errors.page) {
      setErrors(getError());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.name, user.password, user.email]);

  const getError = () => {
    const errorObj = {
      name: !ValidUserName(user.name) ? 'Invalid Name' : false,
      email: !ValidEmail(user.email) ? (user.email?.trim() ? 'Invalid Email' : 'Email is Required !') : false,
      password: !ValidPassword(user.password) ? 'Password should be more than 7 characters' : false,
      image: !ValidImage(user.image) ? 'Invalid File (must be JPG/JPEG/PNG <1MB)' : false,
      page: false,
    };
    return errorObj;
  };

  const handleInput = ({ target }) => {
    const { name, value } = target;
    setUser((state) => ({ ...state, [name]: value }));
  };

  const handleImage = (e) => {
    const image = e?.target?.files?.[0];
    const invalid = !image || !ValidImage(image);
    setUser((state) => ({ ...state, image: invalid ? '' : image }));
  };

  const handleSave = async () => {
    const err = getError();
    setErrors({ ...err });
    if (err.name || err.email || err.password || err.image) {
      return;
    }

    const obj = { ...user };

    if (user.image) {
      const rf = new FileReader();
      rf.readAsDataURL(user.image);
      rf.onloadend = async function (event) {
        const image = event.target.result;

        obj.image = image;

        /** Handle Local Storage after Upload */
        if (id) UpdateUser(obj);
        else {
          obj.id = uuidv4();
          InsertUser(obj);
        }
        localStorage.setItem('user', JSON.stringify(obj));
        history.push('/');
      };
    } else {
      if (id) UpdateUser(obj);
      else {
        obj.id = uuidv4();
        InsertUser(obj);
      }
      localStorage.setItem('user', JSON.stringify(obj));
      history.push('/');
    }
  };

  return (
    <div className={`user-form ${className}`}>
      <h1 className="page-title">{title}</h1>

      <div className="d-flex">
        <label htmlFor="image" onClick={(e) => e.target.querySelector('input')?.click()}>
          {user.image && (
            <img
              src={user.image.name ? URL.createObjectURL(user.image) : user.image}
              alt=""
              className="img-user-profile"
            />
          )}
          <input
            className="input-profile-pic"
            key={user.image?.name + user.image?.size || 'xyz'}
            accept=".jpg, .jpeg, .png"
            type="file"
            onChange={handleImage}
            name="image"
          />
        </label>
        <br />
      </div>
      <label>
        Profile Picture <small>(image must be jpg/png and &lt;1MB)</small>
      </label>
      <div className={`error-message ${errors.image ? 'show' : 'hide'}`}>{errors.image}</div>

      <InputBox
        value={user.name}
        label="Name"
        placeholder="Enter Name"
        onChange={handleInput}
        error={errors.name}
        name="name"
      />
      <InputBox
        value={user.email}
        label="Email"
        placeholder="Enter Email"
        onChange={handleInput}
        error={errors.email}
        name="email"
      />

      <InputBox
        type="textarea"
        value={user.address}
        label="Address"
        placeholder="Enter Address"
        onChange={handleInput}
        error={errors.address}
        name="address"
      />

      <InputBox
        value={user.bday}
        label="Birth Date"
        placeholder="Set Birthday"
        type="date"
        onChange={handleInput}
        error={errors.bday}
        name="bday"
      />

      <InputBox
        value={user.password}
        label="Password"
        placeholder="Enter Password"
        type="password"
        onChange={handleInput}
        error={errors.password}
        name="password"
      />
      <button className="btn-register" type="button" onClick={handleSave}>
        Save
      </button>
      {errors.page && <h4 className="error-page">{errors.page}</h4>}
    </div>
  );
};

export default UserForm;
