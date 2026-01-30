{/* PASSWORD */}
          <div className="securemail-password-password-field">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Новий пароль"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);

                // 🔥 як тільки редагують — скидаємо submitAttempted
                if (submitAttempted) {
                  setSubmitAttempted(false);
                }
              }}
              className={`login-form-input ${
                passwordInvalid || passwordMismatch ? "input-error" : ""
              }`}
              required
            />

            <button
              type="button"
              className="securemail-password-toggle-password"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                /* 👁 */
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              ) : (
                /* 🚫👁 */
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                  <line x1="3" y1="21" x2="21" y2="3" />
                </svg>
              )}
            </button>
          </div>

          {/* HINTS */}
          <div className="securemail-password-reset-password-hints">
            <div className="securemail-password-password-hints">
              <p
                className={
                  passwordRules.length ? "ok" : submitAttempted ? "error" : ""
                }
              >
                • Щонайменше 8 символів
              </p>

              <p
                className={
                  passwordRules.upper ? "ok" : submitAttempted ? "error" : ""
                }
              >
                • Одна велика літера
              </p>

              <p
                className={
                  passwordRules.lower ? "ok" : submitAttempted ? "error" : ""
                }
              >
                • Одна мала літера
              </p>

              <p
                className={
                  passwordRules.number ? "ok" : submitAttempted ? "error" : ""
                }
              >
                • Одна цифра
              </p>

              <p
                className={
                  passwordRules.symbol ? "ok" : submitAttempted ? "error" : ""
                }
              >
                • Один спеціальний символ
              </p>

              <p
                className={
                  hasEnglishLetters ? "ok" : submitAttempted ? "error" : ""
                }
              >
                • Є латинські літери (A–Z)
              </p>
            </div>
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="securemail-password-password-field securemail-password-input-down">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Підтвердіть пароль"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);

                // 🔥 одразу прибираємо червоне
                if (submitAttempted) {
                  setSubmitAttempted(false);
                }
              }}
              className={`login-form-input ${
                passwordMismatch ? "input-error" : ""
              }`}
              required
            />

            <button
              type="button"
              className="securemail-password-toggle-password"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              aria-label={
                showConfirmPassword
                  ? "Hide confirm password"
                  : "Show confirm password"
              }
            >
              {showConfirmPassword ? (
                /* 👁 */
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              ) : (
                /* 🚫👁 */
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                  <line x1="3" y1="21" x2="21" y2="3" />
                </svg>
              )}
            </button>
          </div>

          {/* ERRORS */}
          {submitAttempted && !isPasswordValid && (
            <p className="securemail-password-error">
              Пароль не відповідає вимогам безпеки
            </p>
          )}

          {submitAttempted && confirmPassword.length > 0 && !passwordsMatch && (
            <p className="securemail-password-error">Паролі не співпадають</p>
          )}
          {submitAttempted && confirmPassword.length === 0 && (
            <p className="securemail-password-error">Підтвердіть пароль</p>
          )}

          {/* SUBMIT */}
          <button
            className="reset-password-submit-btn reset-password-btn"
            type="submit"
            disabled={submitting}
          >
            {submitting ? "Збереження..." : "Зберегти пароль"}
          </button>