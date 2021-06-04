import React from 'react'

export default function Footer() {
  return (
    <div class="mt-5 pt-4 pb-6 footer bg-light">
    <div class="container">
      <div class="row">
        <div class="col-lg-5 col-xs-12 about-company">
          <h2>Description</h2>
          <p class="pr-5 text-black-50">We have created an application where you can get previews and lyrics on songs by searching for song and artist name. You then get an overview of songs that you have recently searched for. The idea behind the project was that all group members love music, so it seemed natural to us that the project would be about some music related. </p>
        </div>
        <div class="col-lg-3 col-xs-12 links">
          <h4 class="mt-lg-0 mt-sm-3">Group Members</h4>
            <ul class="m-0 p-0 list-unstyled">
              <li>Amina Amin</li>
              <li>Tiffany Khayyami</li>
              <li>Jakob Persson</li>
            </ul>
        </div>
        <div class="col-lg-4 col-xs-12 location">
          <h4 class="mt-lg-0 mt-sm-4">Location</h4>
          <p>Malmö Universitet</p>
          <p>Nordenskiöldsgatan 1, 211 19 Malmö</p>
          <p><i class="fa fa-envelope-o mr-3"></i>Course: Multi-platform applications with web technician-VT21</p>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col copyright">
          <p><small class="text-black-50">© 2020. All Rights Reserved.</small></p>
        </div>
      </div>
    </div>
    </div>
  )
}
