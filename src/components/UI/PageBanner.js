import styles from "./PageBanner.module.css";

const PageBanner = (props) => {
  const classes = styles.banner + props.className;
  return (
    <div className={`${styles.banner} ${props.className} `}>{props.children}</div>
  );
};

export default PageBanner;