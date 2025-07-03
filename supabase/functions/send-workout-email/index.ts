import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  name: string;
  email: string;
  subject: string;
  htmlContent: string;
  emailType: string;
  performanceRating?: string;
  sessionId?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      name, 
      email, 
      subject, 
      htmlContent, 
      emailType, 
      performanceRating,
      sessionId 
    }: EmailRequest = await req.json();

    console.log("Sending email to:", email, "Type:", emailType);

    const emailResponse = await resend.emails.send({
      from: "FITRONX <onboarding@resend.dev>",
      to: [email],
      subject: subject,
      html: htmlContent,
    });

    console.log("Email sent successfully:", emailResponse);

    // Log the email in the database
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY');
    
    if (supabaseUrl && supabaseKey) {
      try {
        await fetch(`${supabaseUrl}/rest/v1/email_logs`, {
          method: 'POST',
          headers: {
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=minimal'
          },
          body: JSON.stringify({
            recipient_email: email,
            recipient_name: name,
            subject: subject,
            email_type: emailType,
            performance_rating: performanceRating,
            session_id: sessionId
          })
        });
        console.log("Email logged to database");
      } catch (dbError) {
        console.error("Failed to log email to database:", dbError);
      }
    }

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-workout-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);