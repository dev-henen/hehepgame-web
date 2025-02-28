<div class="auto-window" id="signup">
    <div class="blur">

        <div class="content bg-image auto">
            <span class="close"> &times; </span>

            <form method="post" action="" class="form" autocomplete="off" id="user-register-form">
    
                <h1 class="heading gradient-text" style="text-align: center;">Sign Up</h1>
                <br/>

                <div class="error fullName-error"></div>
                <input type="text" name="fullName" placeholder="Full name"/> <br/>
                <div class="error email-error"></div>
                <input type="email" name="emailAddress" placeholder="Email"/> <br/>
                <div class="error birthday-error"></div>
                <input type="date" name="birthday" placeholder="Date of Birthday"/> <br/>
                <div class="error password-error"></div>
                <div class="password-eye">
                    <input type="password" name="password" placeholder="Password"/>
                    <i class="bi bi-eye" ></i>
                </div>
                <br/>
                <div class="error password2-error"></div>
                <input type="password" name="password2" placeholder="Confirm Password"/> <br/>

                <br/>
                <div class="error agree-error"></div>
                <div>
                    <small>
                        <input type="checkbox" name="agree" value="Agreed"/> 
                        by signing up you agree to our 
                        <a href="javascript:void(0)">Privacy</a>
                        /
                        <a href="javascript:void(0)">Policy</a>.
                    </small>
                </div>
                 <br/>
                <input type="button" name="signup" value="SIGN UP" class="button main-button" style="width: 100%;"/> <br/>
    
            </form>  

        </div>

    </div>
</div>


<div class="auto-window" id="signup-otp">
    <div class="blur">

        <div class="content bg-image auto">
            <span class="close"> &times; </span>

            <form method="post" action="" class="form" autocomplete="off" id="user-register-otp-form" >
    
                <h1 class="heading gradient-text" style="text-align: center;">Verify Email Address</h1>
                <br/>

                <div class="error otp-error">We have sent a One Time Password (OTP) to the provided email address,<br>please confirm you own this email.</div>
                <input type="number" name="otp" placeholder="Enter OTP" style="text-align: center;"/> <br/>
                <br/>
                <input type="button" name="confirm-signup" value="Confirm" class="button main-button" style="width: 100%;"/> <br/>
    
            </form>  

        </div>

    </div>
</div>