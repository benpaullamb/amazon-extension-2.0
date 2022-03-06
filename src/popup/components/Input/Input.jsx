import style from './Input.module.scss';

export default function Input({ label, ...inputProps }) {
  return (
    <div className={style.input}>
      <label>{label}</label>
      <input {...inputProps} />
    </div>
  );
}
