import React from "react";

const Footer = () => {
  return (
    <footer>
      <div className="footer-copyright text-center">
        &copy; Developed by xaraf
      </div>

      <style jsx>
        {`
          footer {
            position: absolute;
            font-size: 12px;
            bottom: 0;
            width: 100%;
            height: 60px;
            line-height: 60px;
            font-size: 14px;
            background-color: #f1f1f1;
            color: #000000;
            text-align: center;
          }
          footer a {
            text-decoration: none;
            color: inherit;
            border-bottom: 1px solid;
          }
          footer a:hover {
            border-bottom: 1px transparent;
          }
        `}
      </style>
    </footer>
  );
};

export default Footer;
