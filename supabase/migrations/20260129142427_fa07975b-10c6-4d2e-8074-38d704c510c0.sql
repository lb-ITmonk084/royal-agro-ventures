-- Create enquiries table for chatbot submissions
CREATE TABLE public.enquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  product TEXT NOT NULL,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert enquiries (public form)
CREATE POLICY "Anyone can submit enquiries"
ON public.enquiries
FOR INSERT
WITH CHECK (true);

-- Only allow reading via backend/admin (no public read access)
CREATE POLICY "No public read access"
ON public.enquiries
FOR SELECT
USING (false);