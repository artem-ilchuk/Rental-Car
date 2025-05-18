import s from "./OrderForm.module.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-hot-toast";

const OrderForm = () => {
  const initialValues = {
    name: "",
    email: "",
    date: null,
    comment: "",
  };

  const handleSubmit = (values, { resetForm }) => {
    const existing = JSON.parse(localStorage.getItem("orders")) || [];
    const updatedOrders = [...existing, values];
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    toast.success("Order saved successfully!");
    resetForm();
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Minimum is 3 characters long")
      .max(50, "Too long!")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        "Invalid email format"
      )
      .required("Email is required"),
    date: Yup.date().required("Date is required").nullable(),
    comment: Yup.string().max(500, "Comment is too long"),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ values, setFieldValue }) => (
        <Form className={s.form}>
          <div className={s.header}>
            <h3 className={s.title}>Book your car now</h3>
            <p className={s.sub}>
              Stay connected! We are always ready to help you.
            </p>
          </div>
          <div>
            <div className={s.fiels}>
              <div className={s.req}>
                <label className={s.label}>
                  <Field
                    name="name"
                    type="text"
                    className={s.input}
                    placeholder="Name*"
                  />
                  <ErrorMessage
                    className={s.error}
                    name="name"
                    component="span"
                  />
                </label>
              </div>

              <div className={s.req}>
                <label className={s.label}>
                  <Field
                    name="email"
                    type="email"
                    className={s.input}
                    placeholder="Email*"
                  />
                  <ErrorMessage
                    className={s.error}
                    name="email"
                    component="span"
                  />
                </label>
              </div>

              <div className={s.req}>
                <label className={s.label}>
                  <DatePicker
                    selected={values.date}
                    onChange={(date) => setFieldValue("date", date)}
                    placeholderText="Booking Date"
                    className={s.input}
                    dateFormat="dd/MM/yyyy"
                    minDate={new Date()}
                    calendarClassName="custom-datepicker" // если хочешь стилизовать календарь отдельно
                  />
                  <ErrorMessage
                    className={s.error}
                    name="date"
                    component="span"
                  />
                </label>
              </div>

              <div className={s.req}>
                <Field
                  as="textarea"
                  name="comment"
                  className={s.textarea}
                  rows="4"
                  placeholder="Comment"
                />
                <ErrorMessage
                  className={s.error}
                  name="comment"
                  component="span"
                />
              </div>
            </div>

            <div className={s.buttonWrapper}>
              <button className={s.button} type="submit">
                Send
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default OrderForm;
