import { useEffect, useState } from "react";
import { FiArrowLeft, FiCheckCircle, FiX } from "react-icons/fi";

function LoginModal({ isOpen, onClose, onLogin }) {
  const [step, setStep] = useState("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setStep("phone");
      setPhone("");
      setOtp("");
      setError("");
    }
  }, [isOpen]);

  const handlePhoneSubmit = (event) => {
    event.preventDefault();

    if (!/^[6-9]\d{9}$/.test(phone)) {
      setError("Enter a valid 10-digit Indian mobile number.");
      return;
    }

    setError("");
    setStep("otp");
  };

  const handleOtpSubmit = (event) => {
    event.preventDefault();

    if (!/^\d{4}$/.test(otp)) {
      setError("Enter any 4-digit OTP for this demo.");
      return;
    }

    onLogin({
      phone,
      name: `User ${phone.slice(-4)}`,
    });

    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="modal-overlay"
      onMouseDown={onClose}
      role="presentation"
    >
      <section
        className="auth-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          className="modal-close-button"
          type="button"
          onClick={onClose}
          aria-label="Close login modal"
        >
          <FiX />
        </button>

        {step === "phone" ? (
          <>
            <div className="auth-logo">
              <span className="logo-main">gro</span>
              <span className="logo-highlight">zo</span>
            </div>

            <h2 id="login-modal-title">India's last minute app</h2>

            <p className="auth-description">
              Log in or sign up to continue shopping.
            </p>

            <form onSubmit={handlePhoneSubmit}>
              <label htmlFor="phone-number">Mobile Number</label>

              <div className="phone-input-container">
                <span>+91</span>

                <input
                  id="phone-number"
                  type="tel"
                  inputMode="numeric"
                  maxLength="10"
                  value={phone}
                  onChange={(event) => {
                    setPhone(
                      event.target.value.replace(/\D/g, "")
                    );
                    setError("");
                  }}
                  placeholder="Enter mobile number"
                  autoFocus
                />
              </div>

              {error && <p className="form-error">{error}</p>}

              <button
                className="auth-primary-button"
                type="submit"
              >
                Continue
              </button>
            </form>

            <p className="auth-terms">
              By continuing, you agree to Grozo's Terms of Service and
              Privacy Policy.
            </p>
          </>
        ) : (
          <>
            <button
              className="auth-back-button"
              type="button"
              onClick={() => {
                setStep("phone");
                setOtp("");
                setError("");
              }}
            >
              <FiArrowLeft />
              Change number
            </button>

            <div className="otp-icon">
              <FiCheckCircle />
            </div>

            <h2 id="login-modal-title">Verify your number</h2>

            <p className="auth-description">
              Enter any 4-digit OTP for this frontend demo.
            </p>

            <strong className="otp-phone">+91 {phone}</strong>

            <form onSubmit={handleOtpSubmit}>
              <input
                className="otp-input"
                type="text"
                inputMode="numeric"
                maxLength="4"
                value={otp}
                onChange={(event) => {
                  setOtp(event.target.value.replace(/\D/g, ""));
                  setError("");
                }}
                placeholder="0000"
                aria-label="Enter OTP"
                autoFocus
              />

              {error && <p className="form-error">{error}</p>}

              <button
                className="auth-primary-button"
                type="submit"
              >
                Verify & Continue
              </button>
            </form>
          </>
        )}
      </section>
    </div>
  );
}

export default LoginModal;