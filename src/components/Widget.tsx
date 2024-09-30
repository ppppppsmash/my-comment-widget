import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import supabase from '@/supabaseClient';

import tailwindStyles from '@/index.css?inline';

export const Widget = ({ projectId }: { projectId: string }) => {
  const [rating, setRating] = useState<number>(0);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const onSelectStar = (index: number) => {
    setRating(index + 1);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      p_project_id: projectId,
      p_user_name: ((form as HTMLFormElement).elements.namedItem('name') as HTMLInputElement).value,
      p_user_email: ((form as HTMLFormElement).elements.namedItem('email') as HTMLInputElement).value,
      p_message: ((form as HTMLFormElement).elements.namedItem('message') as HTMLTextAreaElement).value,
      p_rating: rating,
    };

    const { data: returnedData, error } = await supabase.rpc('add_feedback', data);

    setSubmitted(true);
    console.log(data)
    console.log(returnedData);
    console.log(error);
  };

  return (
    <>
      <style>{tailwindStyles}</style>
      <div className="widget fixed bottom-4 right-4 z-50">

        <Popover>
          <PopoverTrigger asChild>
            <Button className="rounded-full shadow-lg hover:scale-105 text-black">
              <MessageCircleIcon className="w-4 h-4 mr-2" />
              Comment
            </Button>
          </PopoverTrigger>

          <PopoverContent className="widget rounded-lg bg-card p-4 shadow-lg w-full max-w-md">

            <style>{tailwindStyles}</style>

            { submitted ? (
                <div>
                  <h3 className="text-lg font-bold">Thank you for your comment!</h3>
                </div>
              ) : (
                <div>
                <h3 className="text-lg font-bold">Send me your comments</h3>

                <form className="space-y-2" onSubmit={onSubmit}>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Enter your name" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" placeholder="Enter your email" />
                    </div>
                  </div>

                  <div className="space-y-2">
                      <Label htmlFor="comment">Comment</Label>
                      <Textarea
                        id="message"
                        placeholder="If you have any comments, please share them here. I would like to improve my work."
                        className="min-h-[100px]"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      What do you think of my portfolio?
                    </p>
                    <div className="flex items-center gap-2">
                      {[...Array(5)].map((_, index) => (
                        <StarIcon
                          key={index}
                          className={`cursor-pointer h-5 w-5 ${rating > index ? 'fill-primary' : 'fill-muted stroke-muted-foreground'}`}
                          onClick={() => onSelectStar(index)}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <Button type="submit" className="text-white bg-[#333333]">Submit</Button>
                </form>
              </div>
            )}
          </PopoverContent>
        </Popover>

      </div>
    </>
  );
};

const StarIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  );
};

const MessageCircleIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>
    </svg>
  );
};
