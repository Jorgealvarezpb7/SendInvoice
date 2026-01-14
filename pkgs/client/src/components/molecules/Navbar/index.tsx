import { UserContext } from "../../../contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import { useUser } from "../../../hooks/user";

import {
  FaBuilding,
  FaChevronDown,
  FaDoorOpen,
  FaHome,
  FaUser,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { FaFile, FaUsers } from "react-icons/fa6";

import "./Navbar.css";
import { Button } from "../../atoms/Button";
import { useActiveCompany, useActiveCompanySetter, useCompanies } from "../../../hooks/company";

export default function Navbar() {
  const user = useUser();
  const companies = useCompanies();
  const activeCompany = useActiveCompany();
  const activeCompanySetter = useActiveCompanySetter();
  const userContext = useContext(UserContext);
  const navigate = useNavigate();
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isCompanyDropdownOpen, setIsCompanyDropdownOpen] = useState(false);

  useEffect(() => {
    if (Array.isArray(companies) && !activeCompany) {
      if (companies.length > 0) {
        activeCompanySetter?.(companies[0].id);
      }
    }
  }, [companies, activeCompany, activeCompanySetter]);

  const handleLogOut = async () => {
    userContext?.logout();
    navigate("/auth");
    setIsUserDropdownOpen(false);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  const toggleCompanyDropdown = () => {
    setIsCompanyDropdownOpen(!isCompanyDropdownOpen);
  };

  const handleCompanySelect = (companyId: string) => {
    activeCompanySetter?.(companyId);
    setIsCompanyDropdownOpen(false);
  };

  return (
    <div className="navbar">
         {/* Dropdown Company */}
      <div className="company-dropdown">
        <button
          className="company-dropdown-trigger"
          onClick={toggleCompanyDropdown}
        >
          <FaBuilding className="company-icon" />
          {activeCompany ? activeCompany.name : 'No Sender Selected'}
          <FaChevronDown
            className={`chevron-icon ${isCompanyDropdownOpen ? "chevron-open" : ""}`}
          />
        </button>

        {isCompanyDropdownOpen && (
          <div className="company-dropdown-menu">
            <div className="company-card-dropdown">
              <h3 className="company-name-dropdown">
                {activeCompany ? activeCompany.name : 'No Sender Selected'}
              </h3>
              <p className="company-id-dropdown">
                {activeCompany ? `ID: ${activeCompany.id}` : 'Please select a sender'}
              </p>

              <div className="company-list-dropdown">
                {companies && companies.length > 0 ? (
                  companies.map((company) => (
                    <button
                      key={company.id}
                      className={`company-item-button ${activeCompany?.id === company.id ? 'active' : ''}`}
                      onClick={() => handleCompanySelect(company.id)}
                    >
                      {company.name}
                    </button>
                  ))
                ) : (
                  <p className="no-companies-text">No sender available.</p>
                )}
              </div>

              <Button
                className="create-company-button-dropdown"
                onClick={() => {
                  setIsCompanyDropdownOpen(false);
                  navigate("/Sender");
                }}
              >
                <FaBuilding className="button-icon" />
                Create Sender
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Navegación central */}
      <div className="navbar-links">
        <Link to={"/Dashboard"}>
          <button className="navbar-button">
            Home
            <FaHome className="icon" />
          </button>
        </Link>
        <Link to={"/Sender"}>
          <button className="navbar-button">
            Sender
            <FaUser className="icon" />
          </button>
        </Link>
        <Link to={"/Recipient"}>
          <button className="navbar-button">
            Recipients
            <FaUsers className="icon" />
          </button>
        </Link>
        <Link to={"/Invoice"}>
          <button className="navbar-button">
            Invoice
            <FaFile className="icon" />
          </button>
        </Link>
      </div>

      {/* Dropdown Logout */}
      <div className="user-dropdown">
        <button className="user-dropdown-trigger" onClick={toggleUserDropdown}>
          <FaUser className="user-icon" />
          <FaChevronDown
            className={`chevron-icon ${isUserDropdownOpen ? "chevron-open" : ""}`}
          />
        </button>

        {isUserDropdownOpen && (
          <div className="user-dropdown-menu">
            <div className="user-card-dropdown">
              <h3 className="user-name-dropdown">
                {user?.name} {user?.surname}
              </h3>
              <p className="user-email-dropdown">{user?.email}</p>
              <Button
                className="log-out-button-dropdown"
                onClick={handleLogOut}
              >
                <FaDoorOpen className="button-icon" />
                Logout
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
