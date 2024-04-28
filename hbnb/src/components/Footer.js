import { IconMail, IconPhoneCall } from "@tabler/icons-react";

function Footer() {
  return (
    <>
      <footer>
        <div className="container p-3 bg-violet-300">
          <div className="footer-content" style={{display : 'grid',color:'#010103',gridtemplatecolumns: '27fr 21fr 21fr 21fr',gap: '8rem',    justifycontent: 'center', textalign: 'left',color: '$text-black'}}>
            <div className="flex">
            <ul className="footer-content__1 w-[20%]  pl-7 pr-5 mb-3">
              <li>
                <span>HOME</span> Rental
              </li>
              <li>
                We offers a big range of home for all your  needs. We
                have the perfect home to meet your needs.
              </li>
              <li className='ml-2 mt-3'>
                <a  href="tel:123456789">
                  <IconPhoneCall /> &nbsp; (123) -456-789
                </a>
              </li>

              <li className='ml-2 mt-3'>
                <a  
                  href="mailto: 
                carrental@gmail.com"
                >
                  <IconMail />
                  &nbsp; homerental@gmail.com
                </a>
              </li>

              <li>
                <a
                  style={{ fontSize: "14px" }}
                  target="_blank"
                  rel="noreferrer"
                  href="https://xpeedstudio.com/"
                >
                  Design by XpeedStudio
                </a>
              </li>
            </ul>

            <ul className="footer-content__2 ml-20 pl-20 w-[30%]">
              <li>Company</li>
              <li>
                <a href="#home">Bhopal</a>
              </li>
              <li>
                <a href="#home">Careers</a>
              </li>
              <li>
                <a href="#home">Mobile</a>
              </li>
              <li>
                <a href="#home">Blog</a>
              </li>
              <li>
                <a href="#home">How we work</a>
              </li>
            </ul>

            <ul className="footer-content__2 w-[30%]">
              <li>Working Hours</li>
              <li>Mon - Fri: 9:00AM - 9:00PM</li>
              <li>Sat: 9:00AM - 19:00PM</li>
              <li>Sun: Closed</li>
            </ul>

            <ul className="footer-content__2 w-[20%]">
              <li>Subscription</li>
              <li>
                <p>Subscribe your Email address for latest news & updates.</p>
              </li>
              <li>
                <input className='p-1 rounded-md' type="email" placeholder="Enter Email Address"></input>
              </li>
              <li>
                <button className="p-1 mt-3 submit-email bg-red-600 rounded-lg">Submit</button>
              </li>
            </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;