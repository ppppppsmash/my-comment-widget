import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export const Widget = () => {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button className="rounded-full shadow-lg hover:scale-105">Feedback</Button>

      <div>
        <h3>Send us your feedback</h3>
        <form>
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Enter your name" />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="Enter your email" />
          </div>
        </form>
      </div>
    </div>
  )
}

