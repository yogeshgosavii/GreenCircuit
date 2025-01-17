import React from 'react'
import Logo from '../components/Logo'
import { Link } from 'react-router-dom'

function User() {
  return (
    <div className='flex border text-gray-800'>
    <div class="fixed top-0 left-0 w-full bg-white p-4 flex justify-between items-center px-10 font-sans border-b">
        <div><Logo/></div>
        <div className='flex flex-row gap-9  text-lg font-semibold items-center'>
        <Link to={"registration"} className='cursor-pointer'>Register</Link>
        <Link to={"login"} state={{label : "user"}} className='cursor-pointer'>Login</Link>
        </div>
    </div>
    <div className='h-full mt-14 border'>
    Certainly! Here's a sample text that you can use to encourage users to list their organization for collecting e-waste:

---

### List Your Organization for E-Waste Collection

Join us in the mission towards responsible e-waste recycling! If your organization is committed to promoting environmental sustainability and recycling practices, consider listing your organization on our platform for e-waste collection.

**Benefits of Listing Your Organization:**

1. **Contribute to Sustainability:** By offering e-waste collection services, your organization actively contributes to reducing environmental impact and promoting a sustainable future.

2. **Community Engagement:** Connect with individuals and businesses in your community who are dedicated to responsible e-waste disposal.

3. **Public Awareness:** Listing your organization enhances visibility, creating awareness about your commitment to environmental stewardship.

4. **Promote Green Practices:** Showcase your organization as a leader in green initiatives by providing a convenient solution for individuals to dispose of their electronic waste responsibly.

**How to List Your Organization:**

1. **Create an Account:** Sign up on our platform and create an account for your organization.

2. **Profile Setup:** Complete your organization's profile, providing details about your e-waste collection services, operating hours, and contact information.

3. **Verification Process:** Our team will review your application to ensure that your organization aligns with our commitment to responsible e-waste management.

4. **Get Listed:** Once approved, your organization will be featured on our platform, allowing users to find and connect with you easily.

**Start Making a Difference Today:**

By listing your organization for e-waste collection, you contribute to a cleaner and greener environment. Together, let's make responsible e-waste disposal accessible to everyone.

Ready to get started? [Sign up now](#) and list your organization for e-waste collection!

---

Feel free to customize the text based on the specific features and processes of your platform.
    </div>
</div>
  )
}

export default User