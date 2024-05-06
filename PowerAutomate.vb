WebAutomation.LaunchEdge.LaunchEdge Url: $'''https://www.google.com/finance/quote/HGW00:COMEX''' WindowState: WebAutomation.BrowserWindowState.Maximized ClearCache: False ClearCookies: False WaitForPageToLoadTimeout: 60 Timeout: 60 PiPUserDataFolderMode: WebAutomation.PiPUserDataFolderModeEnum.AutomaticProfile BrowserInstance=> Browser
System.RunApplication.RunApplication ApplicationPath: $'''C:\\Users\\glopes\\Downloads\\script.txt''' WindowStyle: System.ProcessWindowStyle.Normal ProcessId=> AppProcessId
MouseAndKeyboard.SendKeys.FocusAndSendKeys TextToSend: $'''{Control}({A})''' DelayBetweenKeystrokes: 10 SendTextAsHardwareKeys: False
MouseAndKeyboard.SendKeys.FocusAndSendKeys TextToSend: $'''{Control}({C})''' DelayBetweenKeystrokes: 10 SendTextAsHardwareKeys: False
MouseAndKeyboard.SendKeys.FocusAndSendKeys TextToSend: $'''{Control}({W})''' DelayBetweenKeystrokes: 10 SendTextAsHardwareKeys: False
MouseAndKeyboard.PressReleaseKey.PressKey Control: True Alt: False Shift: False Win: False
MouseAndKeyboard.SendKeys.FocusAndSendKeys TextToSend: $'''{Shift}({I})''' DelayBetweenKeystrokes: 10 SendTextAsHardwareKeys: False
MouseAndKeyboard.PressReleaseKey.ReleaseKey Control: True Alt: False Shift: False Win: False
MouseAndKeyboard.MoveMouse X: 895 Y: 118 RelativeTo: MouseAndKeyboard.PositionRelativeTo.Screen MovementStyle: MouseAndKeyboard.MovementStyle.Instant
MouseAndKeyboard.SendMouseClick.Click ClickType: MouseAndKeyboard.MouseClickType.LeftClick MillisecondsDelay: 0
MouseAndKeyboard.MoveMouse X: 745 Y: 496 RelativeTo: MouseAndKeyboard.PositionRelativeTo.Screen MovementStyle: MouseAndKeyboard.MovementStyle.Instant
MouseAndKeyboard.SendMouseClick.Click ClickType: MouseAndKeyboard.MouseClickType.LeftClick MillisecondsDelay: 0
MouseAndKeyboard.SendKeys.FocusAndSendKeys TextToSend: $'''{Control}({V}){Return}''' DelayBetweenKeystrokes: 10 SendTextAsHardwareKeys: False
MouseAndKeyboard.SendKeys.FocusAndSendKeys TextToSend: $'''{Return}''' DelayBetweenKeystrokes: 10 SendTextAsHardwareKeys: False
MouseAndKeyboard.SendKeys.FocusAndSendKeys TextToSend: $'''{Control}({T})''' DelayBetweenKeystrokes: 10 SendTextAsHardwareKeys: False
MouseAndKeyboard.SendKeys.FocusAndSendKeys TextToSend: $'''https://copper-simple.onrender.com/{Return}''' DelayBetweenKeystrokes: 10 SendTextAsHardwareKeys: False
WAIT 2
MouseAndKeyboard.SendKeys.FocusAndSendKeys TextToSend: $'''{Tab}''' DelayBetweenKeystrokes: 10 SendTextAsHardwareKeys: False
MouseAndKeyboard.SendKeys.FocusAndSendKeys TextToSend: $'''{Control}({V})''' DelayBetweenKeystrokes: 10 SendTextAsHardwareKeys: False
MouseAndKeyboard.SendKeys.FocusAndSendKeys TextToSend: $'''{Return}''' DelayBetweenKeystrokes: 10 SendTextAsHardwareKeys: False
