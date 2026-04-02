import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import ChatIcon from "@mui/icons-material/Chat";
const sideItems = [{ label: "New Chat", icon: <ChatIcon /> }];

const Sidepanel = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex h-screen bg-slate-50">
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        PaperProps={{
          className: "w-64 border-r border-slate-200 bg-white",
        }}
      >
        <Box className="flex items-center justify-between px-4 py-3 border-b border-slate-200">
          <h2 className="text-lg font-semibold">Side Panel</h2>
          <IconButton
            aria-label="close panel"
            onClick={() => setOpen(false)}
            size="small"
            className="text-slate-600"
          >
            ×
          </IconButton>
        </Box>

        <List className="px-0 py-2">
          {sideItems.map((item) => (
            <ListItem key={item.label} disablePadding>
              <Button className="btn-primary">
                <ListItemIcon className="min-w-10 text-slate-600">
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </Button>
            </ListItem>
          ))}
        </List>

        <Divider />

        <Box className="px-4 py-3">
          <p className="text-sm text-slate-500">
            Use Tailwind classes to customize the MUI panel look.
          </p>
        </Box>
      </Drawer>

      <Box className="flex-1 p-5">
        {!open && (
          <IconButton
            onClick={() => setOpen(true)}
            className="text-slate-700 bg-white shadow-sm hover:bg-slate-100"
            aria-label="open panel"
          >
            <MenuIcon />
          </IconButton>
        )}

        <div className="mt-4">
          <h1 className="text-2xl font-bold">Main Content</h1>
          <p className="mt-2 text-slate-600">
            This area is the main page body. The Sidepanel is built with MUI
            components and Tailwind styling.
          </p>
        </div>
      </Box>
    </div>
  );
};

export default Sidepanel;
