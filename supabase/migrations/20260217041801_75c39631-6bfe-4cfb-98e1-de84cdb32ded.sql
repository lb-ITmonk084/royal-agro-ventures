-- Explicitly deny UPDATE on enquiries to make intent clear
CREATE POLICY "Enquiries are immutable"
ON public.enquiries
FOR UPDATE
TO authenticated
USING (false)
WITH CHECK (false);