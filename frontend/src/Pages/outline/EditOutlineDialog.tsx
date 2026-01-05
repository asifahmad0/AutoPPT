import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { DialogClose } from "@radix-ui/react-dialog";

function EditOutlineDialog({ children, outlineData, onUpdate }: any) {
  const [storeOutline, setStoreOutline] = useState(outlineData);
  const [isOpen, setIsOpen] = useState(false);

  const hendleOutlineEdit = (field: string, value: string) => {
    // outline editing
    setStoreOutline({ ...storeOutline, [field]: value });
  };

  const hendleUpdate = () => {
    // edited outline updating here

    onUpdate(outlineData?.slideNo, storeOutline);
    setIsOpen(false);
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger>{children}</DialogTrigger>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Edit Outline</DialogTitle>
            <DialogDescription>
              <div className="flex flex-col gap-2">
                <label className="text-lg">Slider Title</label>
                <input
                  className="border p-1 rounded-lg"
                  onChange={(e) =>
                    hendleOutlineEdit("slidePoint", e.target.value)
                  }
                  placeholder="Slider Title"
                  value={storeOutline.slidePoint}
                />

                <label className="text-lg">Outline Data</label>
                <textarea
                  className="border p-2 rounded-lg"
                  placeholder="Outline"
                  onChange={(e) => hendleOutlineEdit("outline", e.target.value)}
                  value={storeOutline.outline}
                ></textarea>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose>
              <Button className="bg-[crimson] text-white">Close</Button>
            </DialogClose>
            <Button className="bg-[crimson] text-white" onClick={hendleUpdate}>
              Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EditOutlineDialog;
