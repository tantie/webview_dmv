#import "ViewController.h"
#import <WebKit/WebKit.h>

@interface ViewController () <WKNavigationDelegate>
@property (nonatomic, strong) WKWebView *webView;
@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    self.webView = [[WKWebView alloc] initWithFrame:self.view.frame];
    self.webView.navigationDelegate = self;
    [self.view addSubview:self.webView];
    
    NSDictionary *signsQuestions = [self loadJSONFromFile:@"signs_questions"];
    NSDictionary *questions = [self loadJSONFromFile:@"questions"];
    
    NSDictionary *combinedData = @{
        @"signs_questions": signsQuestions,
        @"questions": questions
    };
    
    NSError *error;
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject:combinedData options:NSJSONWritingPrettyPrinted error:&error];
    NSString *jsonString = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
    
    [self loadHTMLWithData:jsonString];
 //   [self checkForUpdates];  // Call this to check for updates
}

- (NSDictionary *)loadJSONFromFile:(NSString *)filename {
    NSString *filePath = [[NSBundle mainBundle] pathForResource:filename ofType:@"json"];
    NSData *data = [NSData dataWithContentsOfFile:filePath];
    return [NSJSONSerialization JSONObjectWithData:data options:kNilOptions error:nil];
}

- (void)loadHTMLWithData:(NSString *)jsonString {
    NSString *escapedJSONString = [jsonString stringByAddingPercentEncodingWithAllowedCharacters:[NSCharacterSet URLQueryAllowedCharacterSet]];
    NSString *path = [[NSBundle mainBundle] bundlePath];
    NSURL *baseURL = [NSURL fileURLWithPath:path];
    NSString *htmlPath = [[NSBundle mainBundle] pathForResource:@"dmv" ofType:@"html"];
    NSString *htmlContent = [NSString stringWithContentsOfFile:htmlPath encoding:NSUTF8StringEncoding error:nil];
    NSString *fullHTML = [NSString stringWithFormat:@"%@<script>parseAndDisplayJSON(decodeURIComponent('%@'));</script>", htmlContent, escapedJSONString];
    [self.webView loadHTMLString:fullHTML baseURL:baseURL];
}

//- (void)checkForUpdates {
//    NSURL *url = [NSURL URLWithString:@"https://###/dmv/questions.json"];
//    NSURLSessionDataTask *downloadTask = [[NSURLSession sharedSession]
//        dataTaskWithURL:url completionHandler:^(NSData *data, NSURLResponse *response, NSError *error) {
//
//            if (error) {
//                NSLog(@"Error downloading questions.json: %@", error);
//                return;
//            }
//
//            NSHTTPURLResponse *httpResponse = (NSHTTPURLResponse *)response;
//            if (httpResponse.statusCode == 200) {
//                NSError *jsonError;
//                NSDictionary *remoteData = [NSJSONSerialization JSONObjectWithData:data options:0 error:&jsonError];
//
//                if (jsonError) {
//                    NSLog(@"Error parsing JSON: %@", jsonError);
//                    return;
//                }
//
//                NSDictionary *localData = [self loadJSONFromFile:@"questions"];
//                if (![remoteData isEqualToDictionary:localData]) {
//                    dispatch_async(dispatch_get_main_queue(), ^{
//                        UIAlertController *alert = [UIAlertController alertControllerWithTitle:@"Обновление" message:@"Доступно обновление данных. Хотите загрузить?" preferredStyle:UIAlertControllerStyleAlert];
//                        UIAlertAction *yesAction = [UIAlertAction actionWithTitle:@"Да" style:UIAlertActionStyleDefault handler:^(UIAlertAction * _Nonnull action) {
//                            // Здесь можно добавить код для обновления данных, если пользователь согласен
//                        }];
//                        UIAlertAction *noAction = [UIAlertAction actionWithTitle:@"Нет" style:UIAlertActionStyleCancel handler:nil];
//                        [alert addAction:yesAction];
//                        [alert addAction:noAction];
//                        [self presentViewController:alert animated:YES completion:nil];
//                    });
//                }
//            } else {
//                NSLog(@"HTTP Response Code: %ld", (long)httpResponse.statusCode);
//            }
//        }];
//
//    [downloadTask resume];
//}

@end
