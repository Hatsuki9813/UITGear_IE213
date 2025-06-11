import { useState } from "react";
import styles from "./ForgotPassword.module.css";
import { useAuthStore } from "../../store/useAuthStore";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
    const { email, forgotPassword, resendOtp, otpVerify, resetPassword } = useAuthStore();

    const [step, setStep] = useState(1);
    const [inputEmail, setInputEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSendEmail = async () => {
        if (!inputEmail.includes("@")) return alert("Vui lòng nhập Email hợp lệ!");
        await forgotPassword(inputEmail);
        setStep(2);
    };

    const handleVerifyOtp = async () => {
        if (!otp.trim()) return alert("Vui lòng nhập mã OTP!");
        await otpVerify(inputEmail || email, otp);
        setStep(3);
    };

    const handleResetPassword = async () => {
        if (!newPassword || newPassword.length < 6) {
            return alert("Mật khẩu phải có ít nhất 6 ký tự.");
        }
        if (newPassword !== confirmPassword) {
            return alert("Mật khẩu xác nhận không khớp.");
        }
        await resetPassword(inputEmail || email, newPassword);
    };

    return (
        <div className={styles.FormContainer}>
            <div className={styles.HeaderText}>QUÊN MẬT KHẨU</div>

            <div className={styles.SubHeaderText}>
                {step === 1 && "Nhập email để nhận mã OTP:"}
                {step === 2 && "Vui lòng kiểm tra email và nhập mã OTP xác nhận."}
                {step === 3 && "Tạo mật khẩu mới cho tài khoản của bạn"}
            </div>

            {step === 1 && (
                <Form.Group className={styles.FormGroup}>
                    <div style={{ display: "flex", gap: "10px" }}>
                        <Form.Control
                            type="email"
                            placeholder="Nhập email"
                            value={inputEmail}
                            onChange={(e) => setInputEmail(e.target.value)}
                            className={styles.input}
                        />
                        <Button className={styles.SubmitButton} onClick={handleSendEmail}>
                            Gửi mã OTP
                        </Button>
                    </div>
                </Form.Group>
            )}

            {step === 2 && (
                <Form.Group className={styles.FormGroup} style={{ flexDirection: "column" }}>
                    <div style={{ display: "flex", gap: "10px" }}>
                        <Form.Control
                            type="text"
                            placeholder="Nhập mã OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className={styles.input}
                        />
                        <Button className={styles.SubmitButton} onClick={handleVerifyOtp}>
                            Xác nhận OTP
                        </Button>
                    </div>
                    <Nav className={styles.links}>
                        <Nav.Link onClick={() => setStep(1)}>Đổi email</Nav.Link>
                        <Nav.Link onClick={() => resendOtp(inputEmail || email)}>
                            Gửi lại mã OTP
                        </Nav.Link>
                    </Nav>
                </Form.Group>
            )}

            {step === 3 && (
                <Form.Group className={styles.FormGroup} style={{ flexDirection: "column" }}>
                    <div>
                        <Form.Label style={{ fontWeight: 600 }}>Mật khẩu mới</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Nhập mật khẩu mới"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className={styles.input}
                        />
                    </div>
                    <div>
                        <Form.Label style={{ fontWeight: 600 }}>Nhập lại mật khẩu</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Nhập lại mật khẩu"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className={styles.input}
                        />
                    </div>
                    <Button
                        className={styles.SubmitButton}
                        onClick={handleResetPassword}
                        style={{ display: "flex", alignSelf: "center" }}>
                        Xác nhận đổi mật khẩu
                    </Button>
                </Form.Group>
            )}
            <div className={styles.divider}></div>
            <div className={styles.footer}>
                Bạn đã có tài khoản?&nbsp;
                <Link to="/login">Đăng nhập tại đây</Link>
            </div>
        </div>
    );
}
