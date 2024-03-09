import React from "react";

const About = () => {
  return (
    <>
      <section
        style={{
          backgroundImage: "url('/images/rooms4.jpg')",
        }}
        className="bg-white"
      >
        <div class="bradcam_area py-4 font-serif font-extrabold text-2xl">
          <h3 class="text-center text-red-600">About StayMate</h3>
        </div>

        <div class="about_area py-16 font-serif ">
          <div class="container mx-auto">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div class="col-span-1">
                <div class="about_info">
                  <div class="section_title mb-8">
                    <span class="text-black">About Us</span>
                    <h3 class="text-3xl font-semibold mt-2">
                      A Luxurious Hotel <br />
                      with Nature
                    </h3>
                  </div>
                  <p class="text-black">
                    Suscipit libero pretium nullam potenti. Interdum, blandit
                    phasellus consectetuer dolor ornare dapibus enim ut
                    tincidunt rhoncus tellus sollicitudin pede nam maecenas,
                    dolor sem. Neque sollicitudin enim. Dapibus lorem feugiat
                    facilisi faucibus et. Rhoncus.
                  </p>
                </div>
              </div>
               <div class="about_main_info  py-16 font-serif">
                <div class="about_thumb flex">
                  <div class="single_about_info">
                    <h3 class="text-3xl font-semibold">
                      We Serve Fresh and <br />
                      Delicious Food
                    </h3>
                    <p class="text-black">
                      Suscipit libero pretium nullam potenti. Interdum, blandit
                      phasellus consectetuer dolor ornare dapibus enim ut
                      tincidunt rhoncus tellus sollicitudin pede nam maecenas,
                      dolor sem. Neque sollicitudin enim. Dapibus lorem feugiat
                      facilisi faucibus et. Rhoncus.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="about_info_area ">
          <div class="about_active owl-carousel">
            <div class="single_slider bg-gray-800"></div>
            <div class="single_slider bg-gray-800"></div>
            <div class="single_slider bg-gray-800"></div>
            <div class="single_slider bg-gray-800"></div>
          </div>
        </div>

        {/* <div class="about_main_info  py-16 font-serif">
          <div class="container mx-auto">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div class="col-span-1">
                <div class="single_about_info">
                  <h3 class="text-3xl font-semibold">
                    We Serve Fresh and <br />
                    Delicious Food
                  </h3>
                  <p class="text-black">
                    Suscipit libero pretium nullam potenti. Interdum, blandit
                    phasellus consectetuer dolor ornare dapibus enim ut
                    tincidunt rhoncus tellus sollicitudin pede nam maecenas,
                    dolor sem. Neque sollicitudin enim. Dapibus lorem feugiat
                    facilisi faucibus et. Rhoncus.
                  </p>
                </div>
              </div>
              <div class="col-span-1">
                <div class="single_about_info">
                  <h3 class="text-3xl font-semibold">
                    We Serve Fresh and <br />
                    Delicious Food
                  </h3>
                  <p class="text-red-600">
                    Suscipit libero pretium nullam potenti. Interdum, blandit
                    phasellus consectetuer dolor ornare dapibus enim ut
                    tincidunt rhoncus tellus sollicitudin pede nam maecenas,
                    dolor sem. Neque sollicitudin enim. Dapibus lorem feugiat
                    facilisi faucibus et. Rhoncus.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        <div class="forQuery py-16 font-serif ">
          <div class="container mx-auto">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div class="col-span-1">
                <div class="Query_border border shadow-xl bg-black p-4 rounded-lg">
                  <div class="flex items-center justify-center">
                    <div class="Query_text">
                      <p class="text-center text-red-600">
                        For Reservation or Query?
                      </p>
                    </div>
                    <div class="phone_num ml-4">
                      <a href="#" class="mobile_no text-white font-semibold">
                        +91 9645106751
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="instragram_area py-16 ">
          <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div class="single_instagram">
              <img src="/images/shalev-cohen-KjueSklMNyY-unsplash.jpg" alt="" />
              <div class="ovrelay">
                <a href="#">
                  <i class="fa fa-instagram"></i>
                </a>
              </div>
            </div>
            <div className="single_instagram">
              <img src="/images/rooms4.jpg" alt="" />
              <div className="ovrelay">
                <a href="#">
                  <i className="fa fa-instagram" />
                </a>
              </div>
            </div>
            <div className="single_instagram">
              <img src="/images/rooms3.jpg" alt="" />
              <div className="ovrelay">
                <a href="#">
                  <i className="fa fa-instagram" />
                </a>
              </div>
            </div>
            <div className="single_instagram">
              <img src="/images/rooms1.jpg" alt="" />
              <div className="ovrelay">
                <a href="#">
                  <i className="fa fa-instagram" />
                </a>
              </div>
            </div>
            <div className="single_instagram">
              <img
                src="/images/beautiful-luxury-outdoor-swimming-pool-hotel-resort.jpg"
                alt=""
              />
              <div className="ovrelay">
                <a href="#">
                  <i className="fa fa-instagram" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
