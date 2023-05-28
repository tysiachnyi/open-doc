import React, { useState } from "react";

const Settings = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSave = () => {
    // Handle saving user settings logic here
  };

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col items-center justify-center w-1/2 p-8 bg-white rounded shadow-2xl">
        <h1 className="text-2xl font-bold">Settings</h1>
        <div className="flex flex-col w-full mt-4">
          <label htmlFor="name">Name</label>
          <input
            className="p-2 border rounded"
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col w-full mt-4">
          <label htmlFor="email">Email</label>
          <input
            className="p-2 border rounded"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col w-full mt-4">
          <label htmlFor="password">Password</label>
          <input
            className="p-2 border rounded"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="w-full p-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600"
          type="button"
          onClick={handleSave}
        >
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default Settings;
